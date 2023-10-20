import WidthWrapper from "@/components/WidthWrapper";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { UserPlus } from "lucide-react";

export default function CreateProject() {
  const { getUser } = getKindeServerSession();
  const user = getUser();
  if (!user || !user.id) redirect("/auth-callback?origin=create-project");

  const displayEmails = () => {
    // list emails entered in the email input
    return <></>;
  };

  return (
    <WidthWrapper className="mt-8">
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
          <div className="flex flex-col items-center gap-2 w-full animate-appear">
            <div className="flex justify-center gap-4 w-full">
              <div className="flex flex-col items-center w-6/12 animate-appear-text gap-4">
                <h5 className="text-xl">Name and Add members</h5>
                <div className="flex flex-col w-full items-center mt-8">
                  <label
                    className="text-lg w-8/12 text-left"
                    htmlFor="project-name"
                  >
                    Name
                  </label>
                  <div className="flex items-center justify-start w-8/12 gap-1">
                    <input
                      className="text-lg w-8/12 p-1 border border-slate-400 rounded-sm"
                      type="text"
                      name="project-name"
                      id="project-name"
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full items-center">
                  <label
                    className="text-lg w-8/12 text-left"
                    htmlFor="member-email"
                  >
                    Member Emails
                  </label>
                  <div className="flex items-center justify-start w-8/12 gap-1">
                    <input
                      className="text-lg w-full p-1 border border-slate-400 rounded-sm"
                      type="text"
                      name="member-email"
                      id="member-email"
                      placeholder="Optional"
                    />
                    <UserPlus className="h-5 w-5 font-semibold hover:cursor-pointer" />
                  </div>
                </div>
                <div className="flex flex-col w-8/12 justify-center items-center">
                  {displayEmails()}
                </div>
              </div>
              <div className="flex flex-col items-center w-6/12 animate-appear-text">
                <h5 className="text-xl">Add your first tasks</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WidthWrapper>
  );
}
