
import { useEffect, useState } from "react";
import { Title } from "../../components/Title";
// import { FundsTable } from "../../components/funds-table/FundsTable";


export function AdminServisai() {
    const [selectedFundsStatus, setSelectedFundsStatus] = useState('All');
    const [fundsStatus, setFundsStatus] = useState([]);

    console.log(fundsStatus);

    useEffect(() => {
        fetch(`http://localhost:3001/api/fundsStatus/`, {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setFundsStatus(data.list)

            })
            .catch(err => console.error(err));
    }, []);



    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Title title='Funds advetisment' />
                </div>
            
                        {/* <div className="col-6 col-sm-4 col-md-3">
                            <select className=" form-select"
                                onChange={e => setSelectedFundsStatus(e.target.value)}>
                                <option value="All">All</option>
                                {fundsStatus.map(st => (
                                    <option key={st} value={st}>{st}</option>
                                ))}
                            </select>
                        </div> */}
                   

                <div className="col-12">
                    {/* <FundsTable filterStatus={selectedFundsStatus}/> */}
                </div>
            </div>
        </div>
    )
}