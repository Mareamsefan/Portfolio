import {Experience as ExperienceProps} from "../types";
import type { PropsWithChildren } from "react";

export default function Experience (props: Readonly<PropsWithChildren<ExperienceProps>>) {
    const {children, name} = props; 
    return (
        <ul id='experiences'> 
            <li>{name}</li>
        </ul>
    )


}