import { Link } from "react-router-dom";

export function Title({ title, uri }) {
    return (
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">{title}</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
                {uri ? <Link className="btn btn-primary" to={uri}>Create new</Link> : null}
            </div>
        </div>
    )
}