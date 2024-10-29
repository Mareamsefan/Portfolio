import type { CreateProject, Project, ProjectDB, UpdateProject } from "@/features/projects/types";


const createId = () => {
  return crypto.randomUUID()
}

//TODO: oppdatter mapperen til å funke, ta inspo fra: https://github.com/mariuswallin/hiof-webapp-2024/blob/main/demos/classlist/backend/src/features/students/student.mapper.ts
export const projectToDb = (data:Project)  => {
  const project = createProject(data)
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
      publishedAt: project.publishedAt,
      updatedAt: project.updatedAt, 
      userId: project.userId,
      status: project.status, 
      githubRep: project.githubRep, 
      tags:JSON.stringify(project.tags), 
      languages: JSON.stringify(project.languages),
      frameworks: JSON.stringify(project.frameworks),
      pictureURLs: JSON.stringify(project.pictureURLs)
    };
  };
  

export const createProject = (project: CreateProject): ProjectDB => {
  return {
    id: createId(),
    name: project.name,
    description: project.description,
    startDate: project.startDate,
    endDate: project.endDate ? new Date(project.endDate): null,
    publishedAt: null,
    updatedAt: null, 
    userId: null,
    status: project.status, 
    githubRep: project.githubRep, 
    tags:JSON.stringify(project.tags), 
    languages: JSON.stringify(project.languages),
    frameworks: JSON.stringify(project.frameworks),
    pictureURLs: JSON.stringify(project.pictureURLs)
  };
}

export const updateProjectToDb = (data: UpdateProject): ProjectDB => {
  return {
    id: data.id, 
    name: data.name,
    description: data.description,
    startDate: data.startDate,
    endDate: data.endDate,
    publishedAt: data.publishedAt,
    updatedAt: new Date(), 
    userId: data.userId, 
    status: data.status,
    githubRep: data.githubRep,
    tags: JSON.stringify(data.tags), 
    languages: JSON.stringify(data.languages),
    frameworks: JSON.stringify(data.frameworks),
    pictureURLs: JSON.stringify(data.pictureURLs),
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
      updatedAt: project.updatedAt ?  new Date(project.startDate): null, 
      status: project.status, 
      githubRep: project.githubRep, 
      userId: project.userId,
      tags: JSON.parse(project.tags),
      languages: JSON.parse(project.languages),
      frameworks: JSON.parse(project.frameworks),
      pictureURLs: JSON.parse(project.pictureURLs)

    }
  }