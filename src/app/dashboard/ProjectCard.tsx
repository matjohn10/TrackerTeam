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
}

const ProjectCard = ({ project, tasks }: CardProps) => {
  const router = useRouter();
  const { data } = trpc.getAllProjectMembers.useQuery({
    projectId: project.id,
  });
  const newestTaskUpdate = tasks.sort((a, b) =>
    a.lastModifiedDate.localeCompare(b.lastModifiedDate)
  );

  const lastTwoTasks = newestTaskUpdate
    .slice(0, 2)
    .map((task) => <TaskCard task={task} />);

  return (
    <Card key={Math.random()}>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription className="flex justify-between items-center">
          <TimeAgo timestamp={newestTaskUpdate[0].lastModifiedDate} />
          <MembersSmallPastilles members={data!} />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2">
        {/* <p>Card Content</p> */}
        {lastTwoTasks}
        <p className="text-lg ml-4 font-bold">.&nbsp;.&nbsp;.</p>
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
