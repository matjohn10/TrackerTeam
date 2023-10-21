"use client";

import { UserPlus } from "lucide-react";
import EmailTag from "./EmailTag";
import { InputWithLabel } from "@/components/FormInput";
import { InputWithButton } from "@/components/FormInputWithButton";

interface ProjectFormProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  emails: string[];
  setEmails: React.Dispatch<React.SetStateAction<string[]>>;
}

const ProjectForm = ({
  name,
  email,
  emails,
  setName,
  setEmail,
  setEmails,
}: ProjectFormProps) => {
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.currentTarget.value);
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.currentTarget.value);

  const handleAddEmail = () => {
    setEmails((prev) => [...prev, email]);
    setEmail("");
  };
  const handleRemoveEmail = (emailRemove: string) => {
    setEmails((prev) => prev.filter((em) => em !== emailRemove));
  };

  const displayEmails = () => {
    // list emails entered in the email input
    return (
      <div className="flex flex-col w-8/12 items-start justify-start gap-2 -mt-[0.1rem]">
        {emails.map((email) => (
          <EmailTag email={email} handleRemoveEmail={handleRemoveEmail} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center w-full h-full lg:w-6/12 animate-appear-text gap-4">
      <h5 className="text-xl">Name and Add members</h5>
      <div className="flex flex-col w-full items-center mt-8">
        <InputWithLabel
          name="name"
          placeholder="Project Name"
          value={name}
          onChange={onChangeName}
        />
      </div>
      <div className="flex flex-col w-full items-center mt-4">
        <InputWithButton
          name="email"
          placeholder="Optional"
          value={email}
          onChange={onChangeEmail}
          buttonTitle="Add"
          onClick={handleAddEmail}
        />
      </div>
      <div className="flex flex-col w-8/12 justify-center max-h-[10rem] overflow-scroll">
        {displayEmails()}
      </div>
    </div>
  );
};

export default ProjectForm;
