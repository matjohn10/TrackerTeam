import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { formatISO } from "date-fns";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { z } from "zod";

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = getUser();
    if (!user || !user.id || !user.email) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    // check if the user is in the database
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    });

    if (!dbUser) {
      // create user in db
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
          firstname: user.given_name,
          lastname: user.family_name,
        },
      });
    }

    return { success: true };
  }),
  getAllProjectMembers: privateProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ input }) => {
      const { projectId } = input;
      const members = await db.works_on.findMany({
        where: {
          projectId,
        },
        include: {
          user: true,
        },
      });
      return members;
    }),
  getProjects: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;
    const projects = await db.works_on.findMany({
      where: {
        userId,
      },
      include: {
        project: {
          include: {
            Tasks: true,
          },
        },
      },
    });

    return projects;
  }),
  addProject: privateProcedure
    .input(
      z.object({
        project: z.object({
          id: z.string(),
          name: z.string(),
          leaderId: z.string(),
        }),
        task: z
          .object({
            title: z.string(),
            description: z.string(),
            category: z.string(),
          })
          .nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { project, task } = input;

      if (!task) {
        await db.project.create({
          data: {
            ...project,
            Works_on: {
              create: [{ userId }],
            },
          },
        });
      } else {
        await db.project.create({
          data: {
            ...project,
            Tasks: {
              create: [
                {
                  ...task,
                  createdId: userId,
                  lastModifiedDate: formatISO(new Date()),
                  lastModifiedId: userId,
                },
              ],
            },
            Works_on: {
              create: [{ userId }],
            },
          },
        });
      }
      return { success: true };
    }),
});

export type AppRouter = typeof appRouter;
