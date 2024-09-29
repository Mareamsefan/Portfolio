import Experience from "./Experience";
import {Experience as ExperienceProps} from "../types";


export default function Experiences({experiences}:{experiences?:ExperienceProps[]} ) {
    return (

        <article id="experiences">
        <h3>Experiences: </h3>
            {experiences?.length === 0 ?(
                <p>you have no experiences yet..</p>
            ) : (
                experiences?.map((experience, index) => (
                    <Experience key={index} {...experience} />
            ))
            )}  
        </article>
    )

}
