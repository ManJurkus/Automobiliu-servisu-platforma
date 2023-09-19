import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { Link } from 'react-router-dom';
import defaultImage from '../../assets/preview.png';
import './PublicServisaiTable.css';

export function PublicServisaiTable() {
    const { servisaiPublic, updateServisaiPublic } = useContext(GlobalContext);

console.log(servisaiPublic);


    useEffect(() => {
        fetch('http://localhost:3001/api/servisaiPublic/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.status === 'ok') {
                    updateServisaiPublic(data.list);
                }
            })
            .catch(console.error);
    }, []);

    return (
    
        <div className="container">
            <div className="row">
                {
                    servisaiPublic
                    // .filter(fund => fund.fund_block !== 3)
                    .map((servisas, index) =>(
                        <div key={servisas.pavadinimas + index} className="card p-3 col-12 col-md-6 col-lg-4">
                    <div className="card-wrapper">
                        <div className="card-img">
                            <img src={servisas.image ? servisas.image : defaultImage } alt="Fund" />
                        </div>
                        <div className="card-box"> 
                            <h4 className="card-title mbr-fonts-style mbr-bold align-center display-5">
                                {servisas.pavadinimas}
                            </h4>
                           <div className="card-underline align-center">
                               <div className="line"></div>
                           </div>
                            <p className="mbr-text mbr-fonts-style align-center display-7">
                                {servisas.miestas}
                            </p>
                            {/* <p className="mbr-text mbr-fonts-style align-center display-7">
                                    Donation goal: {fund.fund_goal} €
                            </p> */}
                            {/* <div className="progress m-2">
                                <div className="progress-bar" role="progressbar" style={{
                                    width: `${(parseFloat(fund.total_donation) / parseFloat(fund.fund_goal)) * 100}%`,
                                }}>
                                {`${(
                                (parseFloat(fund.total_donation) / parseFloat(fund.fund_goal)) * 100).toFixed(2)}%`}
                            </div>
                            </div> */}
                            {/* <p className="mbr-text mbr-fonts-style align-center display-7">
                                Donation received : {fund.total_donation ? fund.total_donation : 0} €
                            </p> */}
                        </div>
                        <div className="mbr-section-btn align-center">
                            <Link to={`/funds/view/${servisas.id}`} className="btn-public btn-primary display-4">Skaitykite about</Link>
                        </div>  
                    </div>
                </div>
                    ))
                }
                
            </div>
        </div>

       
    )
}


