import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import ProjectPageRender from "./ProjectPageRender";
import { redirect } from "next/navigation";
import { db } from "@/db";

const ProjectPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();
  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");
  // where we will need to do calls to the db to get the different projects of the user
  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });
  if (!dbUser) redirect("/auth-callback?origin=dashboard");
  return <ProjectPageRender />;
};

export default ProjectPage;
