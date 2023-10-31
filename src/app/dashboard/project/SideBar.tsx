"use client";

import { trpc } from "@/app/_trpc/client";
import { ArrowUpRightSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  isOpen: boolean;
  projectId: string;
}

const SideBar = ({ isOpen, projectId }: Props) => {
  const router = useRouter();
  const sideClass = isOpen ? "flex h-full sticky top-0 w-2/12 p-2" : "hidden";
  const { data, isLoading } = trpc.getProjects.useQuery();
  const projectsList =
    data &&
    data.map((project) => (
      <div
        className="flex justify-between items-center p-1 w-6/12 rounded-sm hover:bg-gray-100 hover:cursor-pointer"
        onClick={() =>
          router.push("/dashboard/project?id=" + project.projectId)
        }
      >
        <h3
          className={
            project.projectId == projectId
              ? "font-semibold underline text-[#ff5416]"
              : "font-semibold"
          }
        >
          {project.project.name}
        </h3>
        <ArrowUpRightSquare
          className={
            project.projectId == projectId
              ? "font-semibold underline text-[#ff5416] h-5 w-5"
              : "font-semibold h-5 w-5"
          }
        />
      </div>
    ));
  return (
    <div className={sideClass}>
      <div className="flex flex-col w-full h-full gap-4 justify-between items-center py-4">
        <div className="flex flex-col gap-2 items-center w-full pl-4">
          <div className="flex w-full justify-start">
            <h2 className="font-semibold text-xl mt-10 mb-6">Projects</h2>
          </div>
          <div className="flex flex-col p-1  items-start w-full gap-4">
            {isLoading ? (
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
              </div>
            ) : (
              projectsList
            )}
            <Separator className="bg-gray-300" />
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center w-full pl-4">
          <div className="flex w-full justify-start">
            <h2 className="font-semibold text-xl mt-10 mb-6">Members Status</h2>
          </div>
          <div className="flex flex-col p-1  items-start w-full gap-4">
            None
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center w-full pl-4">
          <div className="flex flex-col p-1  items-start w-full gap-4">
            <p className="hover:underline hover:cursor-default">Backlog</p>
            <p className="hover:underline hover:cursor-default">Canceled</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
