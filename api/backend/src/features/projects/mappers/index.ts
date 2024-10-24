import type { Project, ProjectDB } from "@/features/projects/types";

export const mapProject = (project: ProjectDB) => {
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      startDate: new Date(project.startDate),
      endDate: new Date(project.endDate),
      githubRepo: project.githubRep,
      pictureURLs: project.pictureURLs,
      languages: project.languages,
      frameworks: project.frameworks
    };
  };
  