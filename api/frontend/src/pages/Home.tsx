// src/pages/Home.tsx
import ProjectContainer from "../components/project/ProjectContainer";
import Header from "../components/main/Header";
import { Project as ProjectProps } from "../components/project/types";
import { User } from "../components/user/types";

interface HomeProps {
  projectList: ProjectProps[];
  onAddProject: (project: ProjectProps) => void;
  onRemoveProject: (id: string) => void;
  onProjectClick: (project: ProjectProps) => void;
}
export const user: User = {
    id: crypto.randomUUID(),
    name: "Maream Sefan",
    degree: "Bachelor in informatics",
    points: 120,
    email: "mareamns@hiof.no",
    pictureURL: "https://itstud.hiof.no/~mareamns/pf-removebg-preview.png", 
    experiences: ["Figma UI for customer X", " Website for customer Y" ]
   
  }; 

const Home: React.FC<HomeProps> = ({ projectList, onAddProject, onRemoveProject, onProjectClick }) => (
  <>
    <Header user={user} />
    <ProjectContainer 
      projectList={projectList} 
      onAddProject={onAddProject} 
      onRemoveProject={onRemoveProject} 
      onProjectClick={onProjectClick} 
    />
  </>
);

export default Home;
