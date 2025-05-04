import './Genero.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Generos = () => {
    const [generos, setGeneros] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
    axios
        .get('http://localhost:3000/generos')
        .then((response) => setGeneros(response.data))
        .catch((error) => console.error('Error al obtener géneros', error));
    }, []);

    const handleClick = (id) => {
    navigate(`/artistas/genero/${id}`);
    };

    return (
    <div className="generos-container">
        <h1 className="generos-title">Géneros Musicales</h1>
        <div className="generos-grid">
        {generos.map((genero) => (
            <div
            key={genero.id}
            onClick={() => handleClick(genero.id)}
            className="genero-card"
            >
            <img
                src={genero.imagen}
                alt={genero.nombre}
                className="genero-img"
            />
            <div className="genero-overlay">
                <h2 className="genero-name">{genero.nombre}</h2>
            </div>
            </div>
        ))}
        </div>
    </div>
    );
};

export default Generos;
