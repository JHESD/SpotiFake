import './GeneroArtista.css';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const GeneroArtista = () => {
    const { id } = useParams();
    const [artistas, setArtistas] = useState([]);

    useEffect(() => {
        axios
        .get(`http://localhost:3000/artistas/genero/${id}`)
        .then((response) => setArtistas(response.data))
        .catch((error) =>
            console.error('Error al obtener artistas:', error)
        );
    }, [id]);

    return (
        <div className="artistas-container">
        <h1 className="artistas-title">Artistas del Género</h1>
        {artistas.length === 0 ? (
            <p>No hay artistas para este género.</p>
        ) : (
            <div className="artistas-grid">
            {artistas.map((artista) => (
                <Link
                key={artista.id}
                to={`/artista/${artista.id}`}
                className="artista-card"
                >
                <img
                    src={`http://localhost:3000${artista.imagen}`}
                    alt={artista.nombre}
                    className="artista-img"
                />
                <h2 className="artista-nombre">{artista.nombre}</h2>
                </Link>
            ))}
            </div>
        )}
        </div>
    );
};

export default GeneroArtista;
