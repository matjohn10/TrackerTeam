"use client";
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  XCircle,
} from "lucide-react";

import { ComboboxPopover } from "@/components/Popover";
import { InputWithLabel } from "@/components/FormInput";

interface TaskFormProps {
  title: string;
  description: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  isOptional: boolean;
  isFirst: boolean;
}

const TaskForm = ({
  title,
  description,
  setTitle,
  setDescription,
  setCategory,
  isOptional,
  isFirst,
}: TaskFormProps) => {
  const statuses = [
    {
      value: "backlog",
      label: "Backlog",
      icon: HelpCircle,
    },
    {
      value: "todo",
      label: "Todo",
      icon: Circle,
    },
    {
      value: "doing",
      label: "Doing",
      icon: ArrowUpCircle,
    },
    {
      value: "done",
      label: "Done",
      icon: CheckCircle2,
    },
  ];

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);
  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    description.length !== 50 ? setDescription(e.currentTarget.value) : void 0;
  };

  return (
    <div className="flex flex-col items-center w-full h-full lg:w-6/12 animate-appear-text">
      {isFirst ? <h5 className="text-xl">Add your first task</h5> : <></>}
      {isOptional ? <p className="text-xs text-[#ff5416]">Optional</p> : <></>}
      <div className="flex flex-col items-center w-full gap-4 mt-12">
        <InputWithLabel
          name="title"
          placeholder="Task Name"
          value={title}
          onChange={onChangeTitle}
        />
        {/* LIMIT DESCRIPTION TO 50 CHs */}
        <div className="flex w-full flex-col items-center gap-1">
          <InputWithLabel
            name="Description"
            placeholder="Describe the task..."
            value={description}
            onChange={onChangeDescription}
          />
          {description.length === 50 ? (
            <p className="text-xs text-red-600">
              Limit achieved 50/50 characters.
            </p>
          ) : description.length > 0 ? (
            <p className="text-xs text-red-600">
              {50 - description.length}/50 remaining characters.
            </p>
          ) : (
            <></>
          )}
        </div>
        <ComboboxPopover
          name="Status"
          placeholder="+ Set status"
          comboboxElements={statuses}
          setSelectedElement={setCategory}
        />
      </div>
    </div>
  );
};

export default TaskForm;
