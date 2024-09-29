
export default function ProjectCounter({total}: {total:number}) {

    if(total === 0) return null; 
    return (
        <h3 id="projectCounter">Total projects: {total}</h3>
    )
}