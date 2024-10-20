import { mapProject } from "../mappers";
import { getAllProjects } from "../repository";

export const getProjects = async () => {
    const projects = await getAllProjects();
    return projects.map(mapProject);
};