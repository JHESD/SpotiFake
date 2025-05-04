import { useEffect, useState } from 'react';
import axios from 'axios';

function AlbumAdmin() {
    const [albums, setAlbums] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [imagen, setImagen] = useState(null);
    const [artistaId, setArtistaId] = useState('1');
    const [artistas, setArtistas] = useState([]);
    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
        fetchArtistas();
    }, []);

    useEffect(() => {
        if (artistaId) fetchAlbums();
    }, [artistaId]);

    const fetchArtistas = async () => {
        const res = await axios.get('http://localhost:3000/artistas');
        setArtistas(res.data);
    };

    const fetchAlbums = async () => {
        const res = await axios.get(`http://localhost:3000/albums/artista/${artistaId}`);
        setAlbums(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('artistaId', artistaId);
        if (imagen) formData.append('imagen', imagen);

        if (editandoId) {
            await axios.put(`http://localhost:3000/albums/${editandoId}`, formData);
        } else {
            await axios.post('http://localhost:3000/albums', formData);
        }

        fetchAlbums();
        resetFormulario();
    };

    const handleEditar = (album) => {
        setEditandoId(album.id);
        setTitulo(album.titulo);
        setArtistaId(String(album.artistaId));
        setImagen(null);
    };

    const handleEliminar = async (id) => {
        if (confirm('¿Estás seguro de que deseas eliminar este álbum?')) {
            await axios.delete(`http://localhost:3000/albums/${id}`);
            fetchAlbums();
        }
    };

    const resetFormulario = () => {
        setTitulo('');
        setImagen(null);
        setEditandoId(null);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">{editandoId ? 'Editar Álbum' : 'Crear Álbum'}</h2>

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label className="form-label">Seleccionar Artista</label>
                    <select
                        className="form-select"
                        value={artistaId}
                        onChange={(e) => setArtistaId(e.target.value)}
                        required
                    >
                        <option value="">Seleccionar artista</option>
                        {artistas.map((a) => (
                            <option key={a.id} value={a.id}>{a.nombre}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Título del Álbum</label>
                    <input
                        type="text"
                        className="form-control"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Imagen del Álbum {editandoId ? '(opcional)' : ''}</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setImagen(e.target.files[0])}
                        {...(!editandoId && { required: true })}
                    />
                </div>

                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                        {editandoId ? 'Actualizar' : 'Crear Álbum'}
                    </button>
                    {editandoId && (
                        <button type="button" className="btn btn-secondary" onClick={resetFormulario}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            <h3>Álbumes de {artistas.find((a) => a.id === parseInt(artistaId))?.nombre}</h3>
            <div className="row">
                {albums.map((album) => (
                    <div className="col-md-3 mb-3" key={album.id}>
                        <div className="card h-100">
                            <img
                                src={`http://localhost:3000${album.imagen}`}
                                className="card-img-top"
                                alt={album.titulo}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{album.titulo}</h5>
                                <div className="mt-auto d-flex justify-content-between">
                                    <button className="btn btn-sm btn-outline-primary" onClick={() => handleEditar(album)}>Editar</button>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(album.id)}>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AlbumAdmin;