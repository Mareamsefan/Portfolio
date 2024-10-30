import { useState } from "react";
import { Project as ProjectProps } from "./types";

type ProjectCardProps = {
  project: ProjectProps;
  onRemoveProject: (id: string) => void;
  onProjectClick: (project: ProjectProps) => void;
};

export default function ProjectCard({ project, onProjectClick, onRemoveProject }: ProjectCardProps) {
  const {
    id,
    name,
    description,
    languages,
    frameworks,
    startDate,
    githubRep,
    pictureURLs,
  } = project;

  const [hovered, setHovered] = useState<boolean>(false);

  const updateShowState = () => {
    setHovered(true);
  };

  const setShowRemove = () => {
    setHovered(false);
  };

  return (
    <article className="project" onMouseEnter={updateShowState} onMouseLeave={setShowRemove}>
      <img src={pictureURLs[0]} alt={`${project.name}`}/>
      <a href={githubRep} target="_blank">{name}</a>
      {hovered && (
        <button type="button" onClick={() => onProjectClick(project)}>See Project</button>
      )}
    </article>
  );
}
