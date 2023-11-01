"use client";

import TimeAgo from "@/components/TimeAgo";
import {
  CheckCircle,
  Circle,
  CircleEllipsis,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import { useState } from "react";

interface Props {
  task: {
    id?: number;
    projectId?: string | null;
    title: string;
    description: string;
    category: string;
    lastModifiedDate: string;
    createdId?: string;
    lastModifiedId?: string;
  };
  handleDeleteTask: (id: number | undefined) => void;
}

const TaskCardB = ({ task, handleDeleteTask }: Props) => {
  const [iseHover, setIsHover] = useState(false);
  return (
    <div className="flex flex-col min-w-[220px] max-w-[375px] shadow-[0_0_5px_2px_rgba(112,112,112,.6)] rounded-md p-2 w-full">
      <div className="relative flex items-center justify-start gap-4">
        {task.category === "Todo" ? (
          <Circle className="w-4 h-4 hover:text-[#ff5416be] hover:cursor-pointer" />
        ) : task.category === "Doing" ? (
          <CircleEllipsis className="w-4 h-4" />
        ) : task.category === "Done" ? (
          <CheckCircle className="w-4 h-4" />
        ) : (
          <></>
        )}
        <h5 className="font-bold">{task.title}</h5>
        <div
          className="absolute top-0 right-1"
          onMouseOver={() => setIsHover(true)}
          onMouseOut={() => setIsHover(false)}
        >
          {!iseHover ? (
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
  );
};

export default TaskCardB;
