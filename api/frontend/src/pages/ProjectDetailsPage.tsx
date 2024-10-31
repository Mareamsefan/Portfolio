// src/pages/ProjectDetailsPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Project as ProjectProps } from "../components/project/types";
import Project from "../components/project/Project";

type ProjectDetailsPageProps = {
  getProjectById: (id: string) => Promise<ProjectProps | null>;
  onRemoveProject: (id: string) => void;
  onUpdateProject: (updatedProjectId: string) => Promise<void>;
};

const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({ getProjectById, onRemoveProject, onUpdateProject }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<ProjectProps | null>(null);

  useEffect(() => {
    if (projectId) {
      const loadProject = async () => {
        const fetchedProject = await getProjectById(projectId);
        setProject(fetchedProject);
      };
      loadProject();
    }
  }, [projectId, getProjectById]);

  return project ? (
    <Project
      {...project}
      onRemoveProject={onRemoveProject}
      onUpdateProject={onUpdateProject}
    />
  ) : (
    <p>Project not found.</p>
  );
};

export default ProjectDetailsPage;
