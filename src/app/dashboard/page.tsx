import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { redirect } from "next/navigation";
import Projects from "./Projects";
import AddCard from "./AddCard";

const Dashboard = async () => {
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

  return (
    <div className="flex flex-col items-center p-5 w-full">
      <div className="flex flex-col justify-center items-center p-4 mt-4">
        <h1 className="font-bold text-4xl mb-4">Dashboard</h1>
        <p className="text-xl">Where you overview all your current projects!</p>
      </div>
      {/* <div className="relative flex flex-col items-center p-2 w-full md:w-8/12 lg:w-6/12 min-h-[24rem] mx-12 mt-4">
        <div className="absolute top-0 left-0 w-full bg-gray-200 border border-gray-300 opacity-60 rounded-lg -z-10 h-full" />
        <div className="flex flex-col gap-2 h-full rounded-lg w-full p-2 justify-center items-center overflow-scroll">
          <Projects />
        </div>
      </div> */}
      <div className="flex w-10/12 h-full justify-center items-center p-2 mt-8 mx-12">
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
          <Projects />
          <AddCard content="Don't lose track!" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
