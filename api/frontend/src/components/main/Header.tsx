import Experiences from "../user/Experiences.tsx";
import User from "../user/User.tsx";
import {User as UserProps2} from "../user/types.tsx";

export default function Header ({user}: {user: UserProps2}) {

    const {id, name, degree, points, pictureURL} = user
    return (
        <header>
            <section id="bio-container">
           <User id={id} name={name} degree={degree} points={points} pictureURL={pictureURL} email={null} experiences={['']} />
           <Experiences experiences={user.experiences} />
           </section>
        </header>
        
    ); 
}; 
