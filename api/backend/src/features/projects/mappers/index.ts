import type { CreateProject, Project, ProjectDB } from "@/features/projects/types";


//TODO: oppdatter mapperen til å funke, ta inspo fra: https://github.com/mariuswallin/hiof-webapp-2024/blob/main/demos/classlist/backend/src/features/students/student.mapper.ts
export const projectToDb = (project: Project):ProjectDB => {
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
      publishedAt: project.publishedAt,
      userId: project.userId,
      status: project.status, 
      githubRep: project.githubRep, 
      tags:JSON.stringify(project.tags), 
      languages: JSON.stringify(project.languages),
      frameworks: JSON.stringify(project.frameworks),
      pictureURLs: JSON.stringify(project.pictureURLs)
    };
  };
  


  export const projectFromDb = (project: ProjectDB):Project => {
    return {
      id: project.id, 
      name: project.name, 
      description: project.description, 
      startDate: new Date(project.startDate), 
      endDate: project.endDate ? new Date(project.endDate): null, 
      publishedAt: project.publishedAt ? new Date(project.startDate): null, 
      status: project.status, 
      githubRep: project.githubRep, 
      userId: project.userId,
      tags: JSON.parse(project.tags),
      languages: JSON.parse(project.languages),
      frameworks: JSON.parse(project.frameworks),
      pictureURLs: JSON.parse(project.pictureURLs)

    }
  }