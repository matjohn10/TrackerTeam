import React from "react";

interface Props {
  task: {
    id: number;
    title: string;
    description: string;
    category: string;
    projectId: string | null;
    lastModifiedDate: string;
    createdId: string;
    lastModifiedId: string;
  };
}

const TaskCard = ({ task }: Props) => {
  return (
    <div className="flex flex-col py-1 px-2 text-sm justify-center items-center border border-gray-200 rounded-sm">
      <p className="text-md font-semibold">{task.title}</p>
      <div className="flex justify-start w-full">
        <p className="text-xs text-gray-600 text-start">{task.category}</p>
      </div>
    </div>
  );
};

export default TaskCard;
