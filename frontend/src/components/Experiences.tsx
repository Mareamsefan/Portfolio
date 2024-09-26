import Experience from "./Experience";
import {Experience as ExperienceProps} from "./types";


export default function Experiences({experiences}:{experiences?:ExperienceProps[]} ) {
    return (
        <>
        {experiences?.map((experience, index) => (
            <Experience key= {index} {...experience}/>
        ))}
        </>
    )

}
