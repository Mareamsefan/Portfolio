import { mapProject } from "../mappers";
import { getAllProjects } from "../repository";

// her skal du kun sende videre data til rep, kanskje kan du validere dersom du ikke gjør det i controller
export const getProjects = async () => {
    const projects = await getAllProjects();
    return projects.map(mapProject);
};
/*TODO: Skrive om servicelaget, ved å fjerne map, for map skal brukes i repo, men heller bare sende 
 videre repo til controller, kan se noe slik ut: (HUSK å bruke valideringsmetodene som liger i types her i service)
 https://github.com/mariuswallin/hiof-webapp-2024/blob/main/demos/classlist/backend/src/features/students/student.service.ts
 */
