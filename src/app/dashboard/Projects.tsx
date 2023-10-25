"use client";

import { trpc } from "../_trpc/client";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const { data } = trpc.getProjects.useQuery();

  const displayProjects = () => {
    return data && data.length !== 0 ? (
      <>
        {data.map((work) => (
          <ProjectCard project={work.project} tasks={work.project.Tasks} />
        ))}
      </>
    ) : (
      <>
        {/* <p className="text-lg">There are no projects yet...</p>
        <p>
          Start a project&nbsp;
          <Link href="/create-project">
            <Button
              variant="ghost"
              className="p-1 hover:p-1 active:bg-slate-700 hover:bg-[#ff541692]"
            >
              HERE
            </Button>
          </Link>
        </p> */}
      </>
    );
  };
  return <>{displayProjects()}</>;
};

export default Projects;
