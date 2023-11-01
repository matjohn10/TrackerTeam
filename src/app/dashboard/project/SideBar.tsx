"use client";

import { trpc } from "@/app/_trpc/client";
import { ArrowUpRightSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Members from "./Members";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CustomDialog } from "@/components/CustomDialog";
import { Button } from "@/components/ui/button";
import BacklogTasks from "./BacklogTasks";

interface Props {
  isOpen: boolean;
  projectId: string;
  user: KindeUser;
}

const SideBar = ({ isOpen, projectId, user }: Props) => {
  const router = useRouter();
  const sideClass = isOpen ? "flex h-full sticky top-0 w-2/12 p-2" : "hidden";
  const { data, isLoading } = trpc.getProjects.useQuery();
  const projectsList =
    data &&
    data.map((project) => (
      <div
        className="flex justify-between items-center p-1 w-full rounded-sm hover:bg-gray-100 hover:cursor-pointer"
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
              ? "hidden md:block font-semibold underline text-[#ff5416] h-5 w-5"
              : "hidden md:block font-semibold h-5 w-5"
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
            <h2 className="font-semibold text-xl mt-10 mb-4">Members Status</h2>
          </div>
          <div className="flex flex-col p-1  items-start w-full gap-4">
            <Members projectId={projectId} user={user} />
          </div>
        </div>

        <div className="flex flex-col gap-2 items-start w-full pl-4">
          <Dialog>
            <TooltipProvider>
              <Tooltip>
                <DialogTrigger asChild>
                  <TooltipTrigger>
                    <div className="flex flex-col p-1 items-start w-full gap-4">
                      <p className="hover:underline hover:cursor-default">
                        Backlog
                      </p>
                    </div>
                  </TooltipTrigger>
                </DialogTrigger>
                <TooltipContent>
                  <p className="text-sm">Click to open</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DialogContent className="sm:max-w-md h-fit max-h-[55%]">
              <DialogHeader>
                <DialogTitle>{"Backlog Tasks"}</DialogTitle>
                <DialogDescription>
                  {
                    "Tasks can be move here to be saved instead of being deleted."
                  }
                </DialogDescription>
              </DialogHeader>
              <BacklogTasks projectId={projectId} />
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    className="hover:bg-[#ff5416] hover:text-white"
                  >
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
