export type NavProps = {
    onNavClick: (page:string) => void; 
}

export default function Nav(props: NavProps) {
    const {onNavClick} = props
    return (
        <nav>
        <a href="#" onClick={() => onNavClick('home')}>Home</a>
        <a href="#" onClick={() => onNavClick('about')}>About me</a>
        <a href="#"onClick={() => onNavClick('contact')}>Contact</a>
        </nav>
    );
}