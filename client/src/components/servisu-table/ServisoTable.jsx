import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';

export function ServisoTable({filterStatus}) {
    const { role, servisai, updateServisai, deleteServisa, changeFundStatus } = useContext(GlobalContext);

    console.log(servisai);
    useEffect(() => {
        fetch('http://localhost:3001/api/servisai/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    updateServisai(data.list);
                }
            })
            .catch(console.error);
    }, []);

    function deleteFundHandler(title) {
        fetch('http://localhost:3001/api/servisai/' + title, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    deleteServisa(title);
                }
            })
            .catch();
    }

    const imageStyle = {
        width: 100,
        height: 50,
        objectFit: 'container',
        objectPosition: 'center',
    }

    function handleStatusChange(fundID, status) {
        fetch('http://localhost:3001/api/servisai/' + fundID, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ newStatus: status }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') 
                {
                    changeFundStatus(data.info.fundId, data.info.newStatus )
                }
            })
            .catch(console.error);
    }


    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Image</th>
                        <th scope="col">Serviso Pavadinimas</th>
                        <th scope="col">Miestas</th>
                        {/* <th scope="col">Status</th> */}
                        <th className="text-end" scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        servisai
                            .filter(status => filterStatus === 'All' ? true : status.status === filterStatus)
                            .map((servisas, idx) => (
                                <tr key={servisas.pavadinimas + idx}>
                                    <td>{idx + 1}</td>
                                    <td>
                                        <img style={imageStyle} src={servisas.image} alt="Servisas" />
                                    </td>
                                    <td>{servisas.pavadinimas}</td>
                                    <td>{servisas.miestas}</td>
                                    {/* <td >
                                        {
                                            fund.status === 'Pending' ? (
                                                <div className="badge text-bg-warning rounded-pill">Pending</div>
                                            ) : fund.status === 'Active'? (
                                                <div className="badge text-bg-success rounded-pill">Active</div>
                                            ) : fund.status === 'Bloked' ? (
                                                <div className="badge text-bg-danger rounded-pill">Blocked</div>
                                            ) : null 
                                        }
                                    </td> */}

                                    <td>
                                        {role === 'user' ? (
                                            <div className="d-flex gap-2 justify-content-end">
                                                <Link className="btn btn-primary btn-sm" to={`/funds/${servisas.id}/edit`}>
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => deleteFundHandler(servisas.pavadinimas)}
                                                    className="btn btn-danger btn-sm"
                                                    type="button"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        ) : role === 'admin' ? (
                                            <div className="d-flex gap-2 justify-content-end">
                                                    Admin
                                            </div>
                                        ) : null}
                                     </td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </div>
    )
}