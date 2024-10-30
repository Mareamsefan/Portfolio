import { useState } from "react";
import { Project as ProjectProps } from "./types";
import { useNavigate } from "react-router-dom";

type ProjectCardProps = {
  project: ProjectProps;
  onRemoveProject: (id: string) => void;
  onProjectClick: (project: ProjectProps) => void;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const {
    id,
    name,
    githubRep,
    pictureURLs,
  } = project;

  const [hovered, setHovered] = useState<boolean>(false);
  const navigate = useNavigate(); 

  const handleProjectClick = () => {
    navigate(`/project/${id}`); 
  };

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
        <button type="button" onClick={handleProjectClick}>See Project</button>
      )}
    </article>
  );
}
