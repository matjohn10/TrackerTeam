"use client";

import { useState } from "react";
import ProjectForm from "./ProjectForm";
import TaskForm from "./TaskForm";
import { Button } from "@/components/ui/button";
import { trpc } from "../_trpc/client";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { v4 } from "uuid";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import api from "@/lib/utils";

const ProjectCreator = ({ user }: { user: KindeUser }) => {
  const [projectId, setProjectId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const mutation = trpc.addProject.useMutation();
  const addMembers = trpc.addProjectMembers.useMutation();

  // If the message about emails is shown or not
  const [isShown, setIsShown] = useState(false);

  const counter = () => {
    let count = 0;
    if (!title) count += 1;
    if (!description) count += 1;
    if (!category) count += 1;
    return count;
  };
  const checkTaskInputs = !(counter() == 3 || counter() == 0);

  const handleProjectCreation = async () => {
    // create an id
    // sent project info to db using trpc
    const id = v4();
    setProjectId(id);
    const project = { id, name, leaderId: user.id! };
    let task;
    if (!title || !description || !category) {
      task = null;
    } else {
      task = { title, description, category };
    }

    await mutation.mutate({ project, task });
    addMembers.mutate({ emails, projectId: id });
  };
  if (mutation.isSuccess)
    redirect(api.baseURL + "/dashboard/project?id=" + projectId);
  if (mutation.isError) {
    // create a popup to mention error and to try again
    console.log(mutation.error);
  }

  return (
    <div className="flex flex-col items-center gap-2 w-full animate-appear">
      <div className="flex lg:flex-row flex-col items-center justify-center gap-4 w-full mb-4">
        <ProjectForm
          name={name}
          email={email}
          emails={emails}
          setName={setName}
          setEmail={setEmail}
          setEmails={setEmails}
          isShown={isShown}
          setIsShown={setIsShown}
        />
        <TaskForm
          title={title}
          description={description}
          isOptional={true}
          isFirst={true}
          setTitle={setTitle}
          setDescription={setDescription}
          setCategory={setCategory}
        />
      </div>
      <Button
        onClick={() => handleProjectCreation()}
        disabled={mutation.isLoading || checkTaskInputs}
      >
        {mutation.isLoading ? (
          <Loader2 className="w-6 h-6 font-semibold animate-spin" />
        ) : (
          "Create"
        )}
      </Button>
      {mutation.isLoading ? (
        <p className="text-xs font-semibold text-[#ff5416]">
          Creating your project. You will be redirected soon...
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProjectCreator;
