import { User as UserProps } from "./types";

export default function User (props: Readonly<UserProps>) {
    const{name, degree, points, pictureURL} = props
    if (pictureURL)
    return (
        <>
        <article id="pfp-container">
        <img 
        id="pf-img" 
        src={pictureURL}
        alt="profile-picture" />
        </article>
    
        <h1>{name}</h1>
        <h3>Degree: {degree}</h3>
        <h3>Study points: {points}</h3>
        </>
    )

}