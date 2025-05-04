import { useEffect, useState } from 'react';
import axios from 'axios';

function ArtistaAdmin() {
    const [artistas, setArtistas] = useState([]);
    const [nombre, setNombre] = useState('');
    const [generoId, setGeneroId] = useState('');
    const [imagen, setImagen] = useState(null);
    const [generos, setGeneros] = useState([]);
    const [artistaEditando, setArtistaEditando] = useState(null);

    useEffect(() => {
        fetchArtistas();
        fetchGeneros();
    }, []);

    const fetchArtistas = async () => {
        const res = await axios.get('http://localhost:3000/artistas');
        setArtistas(res.data);
    };

    const fetchGeneros = async () => {
        const res = await axios.get('http://localhost:3000/generos');
        setGeneros(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('generoId', generoId);
        if (imagen) formData.append('imagen', imagen);

        try {
            if (artistaEditando) {
                await axios.put(`http://localhost:3000/artistas/${artistaEditando.id}`, formData);
            } else {
                await axios.post('http://localhost:3000/artistas', formData);
            }

            setNombre('');
            setGeneroId('');
            setImagen(null);
            setArtistaEditando(null);
            fetchArtistas();
        } catch (err) {
            console.error('Error al guardar artista:', err);
        }
    };

    const handleDelete = async (id) => {
        if (confirm('¿Estás seguro de eliminar este artista?')) {
            try {
                await axios.delete(`http://localhost:3000/artistas/${id}`);
                fetchArtistas();
            } catch (err) {
                console.error('Error al eliminar artista:', err);
            }
        }
    };

    const handleEdit = (artista) => {
        setArtistaEditando(artista);
        setNombre(artista.nombre);
        setGeneroId(artista.generoId);
        setImagen(null);
    };

    const cancelarEdicion = () => {
        setArtistaEditando(null);
        setNombre('');
        setGeneroId('');
        setImagen(null);
    };

    return (
        <div>
            <h2 className="mb-4">Administrar Artistas</h2>

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label className="form-label">Nombre del Artista</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Género</label>
                    <select
                        className="form-select"
                        value={generoId}
                        onChange={(e) => setGeneroId(e.target.value)}
                        required
                    >
                        <option value="">Seleccionar género</option>
                        {generos.map((g) => (
                            <option key={g.id} value={g.id}>{g.nombre}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Imagen</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={(e) => setImagen(e.target.files[0])}
                        accept="image/*"
                    />
                </div>

                <button type="submit" className="btn btn-primary me-2">
                    {artistaEditando ? 'Actualizar' : 'Crear'} Artista
                </button>
                {artistaEditando && (
                    <button type="button" onClick={cancelarEdicion} className="btn btn-secondary">
                        Cancelar
                    </button>
                )}
            </form>

            <div className="row">
                {artistas.map((a) => (
                    <div className="col-md-3 mb-3" key={a.id}>
                        <div className="card h-100">
                            <img
                                src={`http://localhost:3000${a.imagen}`}
                                className="card-img-top"
                                alt={a.nombre}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{a.nombre}</h5>
                                <p className="card-text">
                                    <strong>Género:</strong> {generos.find(g => g.id === a.generoId)?.nombre || '—'}
                                </p>
                                <button
                                    onClick={() => handleEdit(a)}
                                    className="btn btn-sm btn-warning me-2"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(a.id)}
                                    className="btn btn-sm btn-danger"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ArtistaAdmin;