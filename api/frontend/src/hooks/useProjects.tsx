// src/hooks/useProjects.ts
import { useState, useEffect } from 'react';
import { ofetch } from 'ofetch';
import { endpoints } from '../config/urls';
import { Project as ProjectProps } from '../components/project/types';

const useProjects = () => {
  const [projectList, setProjectList] = useState<ProjectProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = async () => {
    try {
      const response = await ofetch(endpoints.projects);
      setProjectList(response.data);
      setError(null);
    } catch (error) {
      console.error("Error loading projects:", error);
      setError("Kunne ikke laste prosjekter.");
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Legg til et nytt prosjekt
  const addProject = (newProject: ProjectProps) => {
    setProjectList((prev) => [...prev, newProject]);
  };

  // Fjern et prosjekt basert på ID
  const removeProject = (id: string) => {
    setProjectList((prev) => prev.filter((project) => project.id !== id));
  };

  // Oppdater et prosjekt basert på ID
  const updateProject = (updatedProject: ProjectProps) => {
    setProjectList((prev) =>
      prev.map((project) => (project.id === updatedProject.id ? updatedProject : project))
    );
  };

    // Hent prosjekt basert på ID
    const getProjectById = async (id: string): Promise<ProjectProps | null> => {
        const existingProject = projectList.find((project) => project.id === id);
        if (existingProject) return existingProject;
    
        // Hvis prosjektet ikke finnes i listen, gjør en ny forespørsel
        try {
          const response = await ofetch(`${endpoints.projects}/${id}`);
          return response.data;
        } catch (error) {
          console.error("Error loading project:", error);
          setError("Kunne ikke laste prosjekt.");
          return null;
        }
      };

  return { projectList, loadProjects, addProject, removeProject, updateProject, getProjectById, error };
};

export default useProjects;
