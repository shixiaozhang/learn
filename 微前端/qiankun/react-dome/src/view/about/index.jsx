import { useRouteMatch } from 'react-router-dom'
export default function About() {
    let { path, url } = useRouteMatch();
    console.log(path, url);
    return (
        <div className="about">
            <h1>React About Page</h1>
        </div>
    )
}