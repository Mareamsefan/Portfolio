import { Student as StudentProps } from "./types";

export default function Student (props: StudentProps) {
    const{name, degree, points, pictureURL} = props
    return (
        <>
        <img 
        id="pf-img" 
        src={pictureURL}
        alt="profile-picture" 
        />
        <h1>{name}</h1>
        <p>{degree}</p>
        <p>{points}</p>
        </>
    )

}