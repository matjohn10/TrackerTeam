import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = getUser();
  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");
  // where we will need to do calls to the db to get the different projects of the user

  const projects = await db.works_on.findMany({
    where: {
      userId: user.id,
    },
    include: {
      project: true,
    },
  });

  const displayProjects = () => {
    return projects.length !== 0 ? (
      <>
        <p>Projects here</p>
      </>
    ) : (
      <>
        <p className="text-lg">There are no projects yet...</p>
        <p>
          Start a project&nbsp;
          <Link href="/create-project">
            <Button
              variant="ghost"
              className="p-1 hover:p-1 active:bg-slate-700"
            >
              HERE
            </Button>
          </Link>
        </p>
      </>
    );
  };
  return (
    <div className="flex flex-col items-center p-5 w-full">
      <div className="flex flex-col justify-center items-center p-4 mt-4">
        <h1 className="font-bold text-4xl mb-4">Dashboard</h1>
        <p className="text-xl">Where you overview all your current projects!</p>
      </div>
      <div className="relative flex flex-col items-center p-2 w-9/12 min-h-[24rem] mx-12 mt-4">
        <div className="absolute top-0 left-0 w-full bg-gray-200 border border-gray-300 opacity-60 rounded-lg -z-10 h-full" />
        <div className="flex flex-col min-h-[6rem] max-h-[6rem] rounded-lg w-full p-2 justify-center items-center bg-[#d4673fd8]">
          {displayProjects()}
        </div>
      </div>
    </div>
  );
}
