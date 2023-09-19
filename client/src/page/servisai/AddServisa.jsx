import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

import defaultImage from '../../assets/preview.png';
import { Title } from "../../components/Title";
import { Forbiden } from "../Forbiden";

export function AddServisa() {
    const navigate = useNavigate();
    const { role } = useContext(GlobalContext);

    const [image, setImage] = useState('');
    const [imageErr, setImageErr] = useState('');
    const [pavadinimas, setPavadinimas] = useState('');
    const [pavadinimasErr, setPavadinimasErr] = useState('');
    const [miestas, setMiestas] = useState('');
    const [miestasErr, setMiestasErr] = useState('');

    if (role !== 'user') {
        return <Forbiden />;
    }

    function updateImage(e) {
        const formData = new FormData();
        formData.append('servisas_image', e.target.files[0]);

        fetch('http://localhost:3001/api/upload/servisas', {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(data => setImage(`http://localhost:3001/${data.path}`))
            .catch(err => console.error(err));
    }

    function imageValidity() {
        if (image === '') {
            return 'Reikalinga nuotrauka.';
        }

        return '';
    }

    function pavadinimasValidity() {
        const maxSize = 100;

        if (pavadinimas === '') {
            return 'Reikalingas pavadinimas.';
        }

        if (pavadinimas.length > maxSize) {
            return `Per ilgas pavadinimas. Max leidziama ${maxSize} simboliai.`;
        }

        return '';
    }

    function miestasValidity() {
        const minSize = 2;

        if (miestas === '') {
            return 'Reikalingas tekstas.';
        }

        if (miestas.length < minSize) {
            return `Per trumpas aprasymas. Min leidziama ${minSize} simboliai.`;
        }

        return '';
    }




    function isValidForm() {
        const imageMsg = imageValidity();
        setImageErr(imageMsg);

        const pavadinimasMsg = pavadinimasValidity();
        setPavadinimasErr(pavadinimasMsg);


        const miestasMsg = miestasValidity();
        setMiestasErr(miestasMsg);

        return !imageMsg && !miestasMsg  && !pavadinimasMsg;
    }

    function submitHandler(e) {
        e.preventDefault();

        if (!isValidForm()) {
            return;
        }

        fetch('http://localhost:3001/api/servisai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                image, pavadinimas, miestas
            }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    navigate('/servisai');
                }
            })
            .catch(console.error);
    }

    const defaultImageStyle = {
        height: 300,
        objectFit: 'cover',
        objectPosition: 'center',
        border: '1px solid #ccc',
    };
    const imageStyle = {
        height: 300,
        objectFit: 'contain',
        objectPosition: 'center',
        border: '1px solid #ccc',
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Title title="Prideti nauja servisa" />
                </div>
                <form onSubmit={submitHandler} className="col-12 col-sm-8">
                    <div className="row mb-3">
                        <img src={image ? image : defaultImage} alt="Fund" className="col-12 p-0 mb-3"
                            style={image ? imageStyle : defaultImageStyle} />
                        <label className="col-12 col-md-4 form-label" htmlFor="image">Nuotrauka</label>
                        <div className="col-12 col-md-8">
                            <input onChange={updateImage} type="file"
                                className={`form-control ${imageErr ? 'is-invalid' : ''}`} id="image" />
                            <div className="invalid-feedback">{imageErr}</div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-12 col-md-4 form-label" htmlFor="title">Serviso pavadinimas</label>
                        <div className="col-12 col-md-8">
                            <input onChange={e => setPavadinimas(e.target.value)} value={pavadinimas} type="text"
                                className={`form-control ${pavadinimasErr ? 'is-invalid' : ''}`} id="title" />
                            <div className="invalid-feedback">{pavadinimasErr}</div>
                            <small className="text-body-secondary">Example: UAB Auto Servisas</small>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-12 col-md-4 form-label" htmlFor="title">Miestas</label>
                        <div className="col-12 col-md-8">
                            <textarea  onChange={e => setMiestas(e.target.value)} value={miestas} type="text" rows="5"
                                className={`form-control ${miestasErr ? 'is-invalid' : ''}`} id="fundText" />
                            <div className="invalid-feedback">{miestasErr}</div>
                            <small className="text-body-secondary">Example: Vilnius</small>
                        </div>
                    </div>

                    <hr />
                    <button className="btn btn-primary py-2" type="submit">Create</button>
                </form>
            </div>
        </div>
    )
}