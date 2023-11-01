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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Task } from "./TaskDashboard";

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
  handleMovetask: (id: number | undefined, to: string, task: Task) => void;
}

const TaskCardB = ({ task, handleDeleteTask, handleMovetask }: Props) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div className="flex flex-col min-w-[220px] max-w-[375px] shadow-[0_0_5px_2px_rgba(112,112,112,.6)] rounded-md p-2 w-full">
      <div className="relative flex items-center justify-start gap-4">
        <Popover>
          <PopoverTrigger>
            {task.category === "Todo" ? (
              <Circle className="w-4 h-4 hover:text-[#ff5416be] hover:cursor-pointer" />
            ) : task.category === "Doing" ? (
              <CircleEllipsis className="w-4 h-4 hover:text-[#ff5416be] hover:cursor-pointer" />
            ) : task.category === "Done" ? (
              <CheckCircle className="w-4 h-4 hover:text-[#ff5416be] hover:cursor-pointer" />
            ) : (
              <></>
            )}
          </PopoverTrigger>
          <PopoverContent className="w-[175px]">
            <div className="flex flex-col w-full gap-2 items-center">
              {task.category === "Todo" ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMovetask(task.id, "Doing", task)}
                  >
                    Mode to Doing
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMovetask(task.id, "Done", task)}
                  >
                    Move to Done
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMovetask(task.id, "Backlog", task)}
                  >
                    Move to Backlog
                  </Button>
                </>
              ) : task.category === "Doing" ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMovetask(task.id, "Todo", task)}
                  >
                    Mode to Todo
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMovetask(task.id, "Done", task)}
                  >
                    Move to Done
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMovetask(task.id, "Backlog", task)}
                  >
                    Move to Backlog
                  </Button>
                </>
              ) : task.category === "Done" ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMovetask(task.id, "Todo", task)}
                  >
                    Mode to Todo
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMovetask(task.id, "Doing", task)}
                  >
                    Move to Doing
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleMovetask(task.id, "Backlog", task)}
                  >
                    Move to Backlog
                  </Button>
                </>
              ) : (
                <></>
              )}
            </div>
          </PopoverContent>
        </Popover>

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
  );
};

export default TaskCardB;
