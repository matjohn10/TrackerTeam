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
      <div className="flex flex-col justify-center items-center p-4 mt-4 w-full px-[10%]">
        <h1 className="font-bold text-4xl mb-4">Dashboard</h1>
        <p className="text-xl text-center">
          Where you overview all your current projects!
        </p>
        <div className="flex justify-center md:justify-start items-center w-full">
          <h3 className="text-3xl font-semibold mt-8">Projects</h3>
        </div>
      </div>
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
