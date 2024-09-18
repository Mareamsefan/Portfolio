
const Header = () => {
    return (
        <>
        <header>
            <nav>
                <a href="index.html">Home</a>
                <a href="#">About me</a>
                <a href="#">Contact</a>
            </nav>
            <section id="bio-container">
            <img 
            id="pf-img" 
            src="https://itstud.hiof.no/~mareamns/pf-removebg-preview.png"
            alt="profile-picture" 
            />
            <h1>Maream Sefan</h1>
            <p>
             I’m a 20-year-old full-stack developer currently pursuing a degree in Computer Science at 
             Østfold University College, with a strong focus on cybersecurity, backend programming, 
             and machine learning. Outside of my technical interests, I enjoy oil painting, reading, and running.
            </p>
            </section>
        </header>
        </>
    ); 
}; 
export default Header; 