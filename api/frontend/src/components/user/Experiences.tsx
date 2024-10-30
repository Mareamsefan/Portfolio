
export default function Experiences({experiences}:{experiences?:string[]} ) {
    return (
        <article id="experiences">
            <h3>Experiences: </h3>
            {experiences?.length === 0 ? (
                <p>You have no experiences yet...</p>
            ) : (
                <ul>
                    {experiences?.map((experience, index) => (
                        <li key={index}>{experience}</li>
                    ))}
                </ul>
            )}
        </article>
    );
}

