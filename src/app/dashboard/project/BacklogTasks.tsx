"use client";

import { trpc } from "@/app/_trpc/client";

import { useEffect, useState } from "react";
import { Task } from "./TaskDashboard";
import { BookOpen, MoreHorizontal, Trash } from "lucide-react";
import TimeAgo from "@/components/TimeAgo";

interface Props {
  projectId: string;
}

const BacklogTasks = ({ projectId }: Props) => {
  const [tasks, setTasks] = useState<Task[] | undefined>();
  const [isHover, setIsHover] = useState(false);
  const { data } = trpc.getTasks.useQuery({ projectId, taskCat: "Backlog" });
  const deleteTask = trpc.deleteTask.useMutation();

  useEffect(() => {
    setTasks(data);
  }, [data]);
  console.log(tasks);
  const handleDeleteTask = (id: number | undefined) => {
    if (id) {
      deleteTask.mutate({ id });
      setTasks((prev) => prev?.filter((t) => t.id !== id));
    }
  };

  const display = tasks
    ?.sort((a, b) => b.lastModifiedDate.localeCompare(a.lastModifiedDate))
    .map((task) => (
      <div className="flex flex-col w-9/12  justify-start p-2 rounded-sm bg-gray-50">
        <div className="relative flex w-full justify-start">
          <h5 className="font-bold">{task.title}</h5>
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
                onClick={() => handleDeleteTask(task.id)}
              />
            )}
          </div>
        </div>
        <div className="text-sm">{task.description}</div>
        <div className="flex w-full justify-end items-end">
          <TimeAgo timestamp={task.lastModifiedDate} className="text-xs" />
        </div>
      </div>
    ));
  return (
    <div className="flex flex-col items-center gap-2 w-full bg-gray-100 min-h-[4rem] max-h-[20rem] rounded-sm overflow-auto p-3">
      {!tasks || (tasks && tasks.length === 0) ? (
        <div className="flex flex-col items-center gap-4 my-4">
          <h2>Empty backlog</h2>
          <BookOpen />
        </div>
      ) : (
        display
      )}
    </div>
  );
};

export default BacklogTasks;
