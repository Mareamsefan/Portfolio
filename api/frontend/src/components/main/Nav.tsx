import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About me</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/addProject">Add project +</Link>
        </nav>
    );
}
