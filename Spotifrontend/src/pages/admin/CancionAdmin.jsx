import { useEffect, useState } from 'react';
import axios from 'axios';

function CancionAdmin() {
    const [canciones, setCanciones] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [albumId, setAlbumId] = useState('');
    const [titulo, setTitulo] = useState('');
    const [archivoMp3, setArchivoMp3] = useState(null);
    const [editando, setEditando] = useState(null); // ID de canción en edición

    useEffect(() => {
        fetchAlbums();
        fetchCanciones();
    }, []);

    const fetchAlbums = async () => {
        const res = await axios.get('http://localhost:3000/albums');
        setAlbums(res.data);
    };

    const fetchCanciones = async () => {
        const res = await axios.get('http://localhost:3000/canciones');
        setCanciones(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('albumId', albumId);
        if (archivoMp3) {
            formData.append('archivoMp3', archivoMp3);
        }

        try {
            if (editando) {
                await axios.put(`http://localhost:3000/canciones/${editando}`, formData);
            } else {
                await axios.post('http://localhost:3000/canciones', formData);
            }

            setTitulo('');
            setArchivoMp3(null);
            setAlbumId('');
            setEditando(null);
            fetchCanciones();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditar = (cancion) => {
        setTitulo(cancion.titulo);
        setAlbumId(cancion.albumId);
        setEditando(cancion.id);
    };

    const handleEliminar = async (id) => {
        if (!window.confirm('¿Estás seguro de que deseas eliminar esta canción?')) return;
        await axios.delete(`http://localhost:3000/canciones/${id}`);
        fetchCanciones();
    };

    return (
        <div>
            <h2 className="mb-4">Administrar Canciones</h2>

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label className="form-label">Título de la Canción</label>
                    <input
                        type="text"
                        className="form-control"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Álbum</label>
                    <select
                        className="form-select"
                        value={albumId}
                        onChange={(e) => setAlbumId(e.target.value)}
                        required
                    >
                        <option value="">Seleccionar álbum</option>
                        {albums.map((a) => (
                            <option key={a.id} value={a.id}>{a.titulo}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Archivo MP3</label>
                    <input
                        type="file"
                        accept="audio/mpeg"
                        className="form-control"
                        onChange={(e) => setArchivoMp3(e.target.files[0])}
                        required={!editando} // Requerido solo al crear
                    />
                </div>

                <button type="submit" className="btn btn-success">
                    {editando ? 'Actualizar Canción' : 'Crear Canción'}
                </button>

                {editando && (
                    <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={() => {
                            setEditando(null);
                            setTitulo('');
                            setAlbumId('');
                            setArchivoMp3(null);
                        }}
                    >
                        Cancelar Edición
                    </button>
                )}
            </form>

            <h3>Listado de Canciones</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Álbum</th>
                        <th>Archivo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {canciones.map((cancion) => (
                        <tr key={cancion.id}>
                            <td>{cancion.titulo}</td>
                            <td>{albums.find((a) => a.id === cancion.albumId)?.titulo || 'Desconocido'}</td>
                            <td>
                                <audio controls src={`http://localhost:3000${cancion.archivoMp3}`}></audio>
                            </td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditar(cancion)}>Editar</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(cancion.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CancionAdmin;