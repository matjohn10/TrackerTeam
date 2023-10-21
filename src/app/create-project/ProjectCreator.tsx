"use client";

import { useState } from "react";
import ProjectForm from "./ProjectForm";
import TaskForm from "./TaskForm";
import { Button } from "@/components/ui/button";

const ProjectCreator = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleProjectCreation = () => {
    // create an id
    // sent project info to db using trpc
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full animate-appear">
      <div className="flex lg:flex-row flex-col items-center justify-center gap-4 w-full ">
        <ProjectForm
          name={name}
          email={email}
          emails={emails}
          setName={setName}
          setEmail={setEmail}
          setEmails={setEmails}
        />
        <TaskForm
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          setCategory={setCategory}
        />
      </div>
      <Button onClick={() => handleProjectCreation()}>Create</Button>
    </div>
  );
};

export default ProjectCreator;
