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
      const members = await db.worksOn.findMany({
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
    const projects = await db.worksOn.findMany({
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
  getProject: privateProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { projectId } = input;
      const project = await db.worksOn.findFirst({
        where: {
          userId,
          projectId,
        },
        include: {
          project: {
            include: {
              Tasks: true,
            },
          },
        },
      });
      return project;
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
            WorksOn: {
              create: { userId },
            },
          },
        });
      } else {
        await db.project.create({
          data: {
            ...project,
            Tasks: {
              create: {
                ...task,
                createdId: userId,
                lastModifiedDate: formatISO(new Date()),
                lastModifiedId: userId,
              },
            },
            WorksOn: {
              create: { userId: userId },
            },
          },
        });
      }
    }),
  addProjectMembers: privateProcedure
    .input(z.object({ emails: z.array(z.string()), projectId: z.string() }))
    .mutation(async ({ input }) => {
      let emailSent: boolean = false;
      input.emails.forEach(async (email) => {
        const user = await db.user.findFirst({
          where: {
            email: email,
          },
        });

        if (!user) {
          emailSent = true;
          // send an email with link with project id hashed
          console.log(email);
        } else {
          await db.worksOn.create({
            data: {
              projectId: input.projectId,
              userId: user.id,
            },
          });
        }
      });
      return { success: true, emailSent };
    }),
  addTask: privateProcedure
    .input(
      z.object({
        task: z.object({
          title: z.string(),
          description: z.string(),
          category: z.string(),
        }),
        project: z.object({ id: z.string() }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { task, project } = input;

      await db.task.create({
        data: {
          ...task,
          createdId: userId,
          lastModifiedId: userId,
          projectId: project.id,
        },
      });
    }),
});

export type AppRouter = typeof appRouter;
