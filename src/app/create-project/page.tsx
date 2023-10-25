import WidthWrapper from "@/components/WidthWrapper";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import ProjectCreator from "./ProjectCreator";

export default function CreateProject() {
  const { getUser } = getKindeServerSession();
  const user = getUser();
  if (!user || !user.id) redirect("/auth-callback?origin=create-project");

  return (
    <WidthWrapper className="my-8 ">
      <div className="flex justify-center w-full">
        <div className="flex flex-col gap-4 justify-center items-center w-full">
          <div className="flex flex-col gap-5 items-center">
            <h1 className="text-4xl">
              Initiate your{" "}
              <span className=" text-[#ff5416] font-semibold">Project</span>
            </h1>
            <p className="w-8/12 text-md text-center">
              You can name, add other members, and initialize the first tasks.
            </p>
          </div>
          <div className="flex items-end h-16 w-full">
            <div className="w-full border border-b-slate-200" />
          </div>
          <ProjectCreator user={user} />
        </div>
      </div>
    </WidthWrapper>
  );
}
