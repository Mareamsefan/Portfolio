import { Student, Experience } from "../features/student/types";

export const experiences: Experience[] = [
    { name: 'Fullstack development' },
    { name: 'Cyber security' },
    { name: 'Information security' }
  ];
export const student: Student = {
    name: "Maream Sefan",
    degree: 'Computer Science',
    points: 100,
    email: 'mareamns@hiof.no', 
    pictureURL: 'https://itstud.hiof.no/~mareamns/M.png',
    experiences: experiences
    
}

