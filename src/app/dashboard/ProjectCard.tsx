"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import TimeAgo from "@/components/TimeAgo";
import { trpc } from "../_trpc/client";
import MembersSmallPastilles from "@/components/MembersSmallPastilles";
import TaskCard from "./TaskCard";
import { MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { Project } from "./Projects";
import { Types } from "ably/promises";

interface CardProps {
  project: { id: string; name: string; leaderId: string };
  tasks: {
    id: number;
    title: string;
    description: string;
    category: string;
    projectId: string | null;
    lastModifiedDate: string;
    createdId: string;
    lastModifiedId: string;
  }[];
  user: KindeUser;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  channel: Types.RealtimeChannelPromise;
}

const ProjectCard = ({
  project,
  tasks,
  user,
  setProjects,
  channel,
}: CardProps) => {
  const router = useRouter();
  const deleteForOne = trpc.deleteProjectForOne.useMutation();
  const deleteForAll = trpc.deleteProjectForAll.useMutation();
  const [isHover, setIsHover] = useState(false);

  //add state for members
  const { data } = trpc.getAllProjectMembers.useQuery({
    projectId: project.id,
  });
  const newestTaskUpdate = tasks.sort((a, b) =>
    a.lastModifiedDate.localeCompare(b.lastModifiedDate)
  );

  const lastTwoTasks = newestTaskUpdate
    .slice(0, 2)
    .map((task) => <TaskCard task={task} />);

  const handleDeleteProject = (id: string) => {
    if (user.id === project.leaderId) {
      deleteForAll.mutate({ projectId: id });
      channel.publish("delete-all", { id });
    } else {
      deleteForOne.mutate({ projectId: id });
      setProjects((prev) => prev.filter((p) => p.projectId !== id));
    }
  };

  return (
    <Card key={Math.random()}>
      <CardHeader>
        <CardTitle>
          <div className="relative flex items-center justify-between w-full">
            <h2>{project.name}</h2>
            <div
              className="absolute top-0 right-1"
              onMouseOver={() => setIsHover(true)}
              onMouseOut={() => setIsHover(false)}
            >
              {!isHover ? (
                <MoreHorizontal className="h-4 w-4 opacity-80 hover:cursor-pointer" />
              ) : (
                <Trash
                  className="h-4 w-4 opacity-80 hover:cursor-pointer text-red-400"
                  onClick={() => handleDeleteProject(project.id)}
                />
              )}
            </div>
          </div>
        </CardTitle>
        <CardDescription className="flex justify-between items-center">
          {newestTaskUpdate[0] && (
            <TimeAgo timestamp={newestTaskUpdate[0].lastModifiedDate} />
          )}
          <MembersSmallPastilles members={data!} />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2">
        <h5 className="text-lg font-bold  mr-4">Tasks</h5>
        {lastTwoTasks}
        {newestTaskUpdate[0] ? (
          <p className="text-lg ml-4 font-bold">.&nbsp;.&nbsp;.</p>
        ) : (
          <p className="text-md mt-2 font-semibold"> No tasks yet...</p>
        )}
      </CardContent>
      <CardFooter className="justify-center">
        <Button
          onClick={() => router.push("/dashboard/project?id=" + project.id)}
        >
          Open
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
