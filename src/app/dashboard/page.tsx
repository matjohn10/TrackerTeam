import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = getUser();
  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");
  // where we will need to do calls to the db to get the different projects of the user

  const displayProjects = () => {
    return <></>;
  };
  return (
    <div className="flex flex-col items-center p-5 w-full">
      <div className="flex flex-col justify-center items-center p-4 mt-4">
        <h1 className="font-bold text-4xl mb-4">Dashboard</h1>
        <p className="text-xl">Where you overview all your current projects!</p>
      </div>
      <div className="relative flex flex-col items-center p-2 w-9/12 min-h-[24rem] mx-12 mt-4">
        <div className="absolute top-0 left-0 w-full bg-gray-200 border border-gray-300 opacity-60 rounded-lg -z-10 h-full" />
        <div>{displayProjects()}</div>
      </div>
    </div>
  );
}
