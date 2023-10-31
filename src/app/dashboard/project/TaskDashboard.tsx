"use client";

import { Separator } from "@/components/ui/separator";
import { MessageSquare, PlusCircle, Share } from "lucide-react";
import TaskCardB from "./TaskCardB";
import AddTask from "./AddTask";
import { CustomDialog } from "@/components/CustomDialog";
import { useEffect, useState } from "react";
import TaskForm from "@/app/create-project/TaskForm";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/app/_trpc/client";

interface Props {
  isOpen: boolean;
  projectId: string;
}
type Task = {
  id?: number;
  projectId?: string | null;
  title: string;
  description: string;
  category: string;
  lastModifiedDate: string;
  createdId?: string;
  lastModifiedId?: string;
};

const TaskDashboard = ({ projectId, isOpen }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categ, setCateg] = useState("");
  const [tasks, setTasks] = useState<Task[] | undefined>();
  const { data, isLoading } = trpc.getProject.useQuery({
    projectId: projectId,
  });
  useEffect(() => {
    setTasks(data?.project.Tasks);
  }, [data]);
  const addTask = trpc.addTask.useMutation();
  const todoTasks =
    tasks &&
    tasks.map((task) =>
      task.category == "Todo" ? <TaskCardB task={task} /> : <></>
    );
  const doingTasks =
    tasks &&
    tasks.map((task) =>
      task.category == "Doing" ? <TaskCardB task={task} /> : <></>
    );
  const doneTasks =
    tasks &&
    tasks.map((task) =>
      task.category == "Done" ? <TaskCardB task={task} /> : <></>
    );

  const handleNewTask = () => {
    data &&
      addTask.mutate({
        task: { title, description, category: categ },
        project: { id: data.projectId },
      });
    setTasks((prev) =>
      prev
        ? [
            ...prev,
            {
              title,
              description,
              category: categ,
              lastModifiedDate: new Date().toISOString(),
            },
          ]
        : prev
    );
  };

  const dialogContent = (
    <div className="flex flex-col w-full gap-2 items-center">
      <TaskForm
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        setCategory={setCateg}
        isOptional={false}
        isFirst={false}
      />
    </div>
  );
  const dialogAddBtn = (
    <DialogClose>
      <Button
        type="button"
        className={
          title.length === 0 || description.length === 0 || categ.length === 0
            ? "hidden"
            : ""
        }
        onClick={() => handleNewTask()}
      >
        Add
      </Button>
    </DialogClose>
  );
  return (
    <div
      className={
        isOpen
          ? "flex flex-col gap-2 p-4 mt-4 mx-10 w-10/12"
          : "flex flex-col gap-2 p-4 mt-4 mx-10 w-full"
      }
    >
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center w-full">
          <h2 className="font-bold text-3xl">{data?.project.name}</h2>
          <div className="flex items-center gap-4 w-fit">
            <CustomDialog
              child={
                <div className="flex items-center hover:underline hover:cursor-default">
                  Add Task &nbsp; <PlusCircle className="w-4 h-4" />
                </div>
              }
              title="Create Task"
              description={`Add a new task to your project manager.`}
              additionalClose={dialogAddBtn}
              contentChildren={dialogContent}
            />
            <div className="flex items-center hover:underline hover:cursor-default">
              Share &nbsp; <Share className="w-4 h-4" />
            </div>
            <div className="flex items-center hover:underline hover:cursor-default">
              Comments &nbsp; <MessageSquare className="w-4 h-4" />
            </div>
          </div>
        </div>
        <br />
        <Separator />
      </div>
      <div className="flex flex-col xl:flex-row xl:justify-between px-[12rem] py-6 w-full gap-4">
        <div className="flex flex-col w-full items-center" key="Todo">
          <h3 className="text-xl font-semibold mb-4">Todo</h3>
          {isLoading ? (
            <Skeleton className="w-full h-16" />
          ) : (
            <div className="flex flex-col items-center w-full gap-4">
              {todoTasks}
            </div>
          )}
          <AddTask
            setTasks={setTasks}
            category="Todo"
            projectId={data?.projectId}
          />
        </div>
        <div className="flex flex-col w-full items-center" key="Doing">
          <h3 className="text-xl font-semibold mb-4">Doing</h3>
          {isLoading ? (
            <Skeleton className="w-full h-16" />
          ) : (
            <div className="flex flex-col items-center w-full gap-4">
              {doingTasks}
            </div>
          )}
          <AddTask
            setTasks={setTasks}
            category="Doing"
            projectId={data?.projectId}
          />
        </div>
        <div className="flex flex-col w-full items-center" key="Done">
          <h3 className="text-xl font-semibold mb-4">Done</h3>
          {isLoading ? (
            <Skeleton className="w-full h-16" />
          ) : (
            <div className="flex flex-col items-center w-full gap-4">
              {doneTasks}
            </div>
          )}
          <AddTask
            setTasks={setTasks}
            category="Done"
            projectId={data?.projectId}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;
