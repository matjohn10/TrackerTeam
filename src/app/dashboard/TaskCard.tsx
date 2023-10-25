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
  return <div className="text-sm">{task.title}</div>;
};

export default TaskCard;
