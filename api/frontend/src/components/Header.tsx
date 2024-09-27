import Experiences from "./Experiences";
import Student from "./Student";
import { Student as StudentProps } from "./types";

export default function Header ({student}: {student: StudentProps}) {

    const {name, degree, points, pictureURL} = student
    return (
        <header>
            <section id="bio-container">
           <Student name={name} degree={degree} points={points}  pictureURL={pictureURL} />
           <Experiences experiences={student.experiences} />
           </section>
        </header>
        
    ); 
}; 