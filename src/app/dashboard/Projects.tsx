"use client";

import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { trpc } from "../_trpc/client";
import ProjectCard from "./ProjectCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useChannel } from "ably/react";

interface Props {
  user: KindeUser;
}

type Project = {
  userId: string;
  projectId: string;
  project: {
    id: string;
    name: string;
    leaderId: string;
    Tasks: {
      projectId: string | null;
      id: number;
      title: string;
      description: string;
      category: string;
      lastModifiedDate: string;
      createdId: string;
      lastModifiedId: string;
    }[];
  };
  id: number;
};

const Projects = ({ user }: Props) => {
  const { data, isLoading } = trpc.getProjects.useQuery();

  const displayProjects = () => {
    return data && data.length !== 0 ? (
      <>
        {data.map((work) => (
          <ProjectCard project={work.project} tasks={work.project.Tasks} />
        ))}
      </>
    ) : isLoading ? (
      <>
        <Card key={Math.random()}>
          <CardHeader>
            <CardTitle>
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </CardTitle>
            <CardDescription className="flex justify-between items-center">
              <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Skeleton className="w-full h-[40px] rounded-full" />
          </CardContent>
          <CardFooter className="justify-center">
            <Skeleton className="w-[100px] h-[20px] rounded-full" />
          </CardFooter>
        </Card>
      </>
    ) : (
      <></>
    );
  };
  return <>{displayProjects()}</>;
};

export default Projects;
