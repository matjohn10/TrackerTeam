"use client";

import { useSearchParams } from "next/navigation";
import SideBar from "./SideBar";
import { useState } from "react";
import { AlignJustify } from "lucide-react";
import TaskDashboard from "./TaskDashboard";
import { Separator } from "@/components/ui/separator";

const ProjectPageRender = () => {
  const [isOpen, setIsOpen] = useState(true);
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id") || "";

  return (
    <div className="flex relative gap-2 h-[calc(100vh-89px)] w-full">
      <div className="absolute -top-[3.25rem] left-8 flex justify-center items-center z-30">
        <AlignJustify
          className="font-semibold hover:cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>
      <SideBar isOpen={isOpen} projectId={projectId} />
      <Separator orientation="vertical" />
      <TaskDashboard isOpen={isOpen} projectId={projectId} />
    </div>
  );
};

export default ProjectPageRender;
