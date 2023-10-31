"use client";

import { trpc } from "@/app/_trpc/client";
import TaskForm from "@/app/create-project/TaskForm";
import { CustomDialog } from "@/components/CustomDialog";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

interface Props {
  category: string;
  projectId: string | undefined;
  setTasks: (value: React.SetStateAction<Task[] | undefined>) => void;
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

const AddTask = ({ setTasks, category, projectId }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categ, setCateg] = useState("");
  const addTask = trpc.addTask.useMutation();

  const handleNewTask = () => {
    projectId &&
      addTask.mutate({
        task: { title, description, category: categ },
        project: { id: projectId },
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

  const trigger = (
    <div className="flex w-full justify-center">
      <div className="flex items-center justify-start w-6/12 gap-2 pl-2 mt-2 rounded-md hover:bg-gray-200 hover:cursor-pointer">
        <PlusCircle className="w-4 h-4" />
        <p>Add Task</p>
      </div>
    </div>
  );
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
    <CustomDialog
      child={trigger}
      title="Create Task"
      description={`Make a new task for the ${category} manager.`}
      contentChildren={dialogContent}
      additionalClose={dialogAddBtn}
    />
  );
};

export default AddTask;
