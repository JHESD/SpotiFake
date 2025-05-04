import './ArtistaDetalle.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ArtistaDetalle = () => {
    const { id } = useParams();
    const [artista, setArtista] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/artistas/${id}`)
        .then(response => setArtista(response.data))
        .catch(error => console.error("Error al obtener artista:", error));
    }, [id]);

    if (!artista) return <p className="artista-cargando">Cargando artista...</p>;

    return (
        <div className="artista-detalle">
            <h1 className="detalle-artista-nombre">{artista.nombre}</h1>

            {artista.albums.length === 0 ? (
                <p className="artista-sin-albums">Este artista no tiene álbumes aún.</p>
            ) : (
                artista.albums.map(album => (
                    <div key={album.id} className="album-container">
                        <div className="album-info">
                            <img
                                src={`http://localhost:3000${album.imagen}`}
                                alt={album.titulo}
                                className="album-image"
                            />

                            <div className="album-details">
                                <h2 className="album-title">{album.titulo}</h2>
                                <ul className="song-list">
                                    {album.canciones.map(cancion => (
                                        <li key={cancion.id} className="song-item">
                                            <p className="song-title">{cancion.titulo}</p>
                                            <audio controls className="audio-player">
                                                <source src={`http://localhost:3000${cancion.archivoMp3}`} type="audio/mp3" />
                                                Tu navegador no soporta el elemento de audio.
                                            </audio>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ArtistaDetalle;