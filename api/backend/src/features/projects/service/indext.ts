import { mapProject } from "../mappers";
import { getAllProjects } from "../repository";

// her skal du kun sende videre data til rep, kanskje kan du validere dersom du ikke gjør det i controller
export const getProjects = async () => {
    const projects = await getAllProjects();
    return projects.map(mapProject);
};