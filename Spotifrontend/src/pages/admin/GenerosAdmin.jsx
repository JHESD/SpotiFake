import { useEffect, useState } from 'react';
import axios from 'axios';

function GenerosAdmin() {
    const [generos, setGeneros] = useState([]);
    const [nombre, setNombre] = useState('');
    const [imagen, setImagen] = useState(null);
    const [editandoId, setEditandoId] = useState(null);

    const fetchGeneros = async () => {
        try {
            const res = await axios.get('http://localhost:3000/generos');
            setGeneros(res.data);
        } catch (err) {
            console.error('Error al obtener géneros:', err);
        }
    };

    useEffect(() => {
        fetchGeneros();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', nombre);
        if (imagen) formData.append('imagen', imagen);

        try {
            if (editandoId) {
                await axios.put(`http://localhost:3000/generos/${editandoId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                await axios.post('http://localhost:3000/generos/cg', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }

            setNombre('');
            setImagen(null);
            setEditandoId(null);
            fetchGeneros();
        } catch (err) {
            console.error('Error al guardar género:', err);
        }
    };

    const handleEditar = (genero) => {
        setNombre(genero.nombre);
        setImagen(null);
        setEditandoId(genero.id);
    };

    const handleEliminar = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este género?')) return;
        try {
            await axios.delete(`http://localhost:3000/generos/${id}`);
            fetchGeneros();
        } catch (err) {
            console.error('Error al eliminar género:', err);
        }
    };

    const cancelarEdicion = () => {
        setNombre('');
        setImagen(null);
        setEditandoId(null);
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Panel de Administración - Géneros</h1>

            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">{editandoId ? 'Editar género' : 'Crear nuevo género'}</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Imagen</label>
                            <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={(e) => setImagen(e.target.files[0])}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary me-2">
                            {editandoId ? 'Actualizar' : 'Crear'}
                        </button>
                        {editandoId && (
                            <button type="button" className="btn btn-secondary" onClick={cancelarEdicion}>
                                Cancelar
                            </button>
                        )}
                    </form>
                </div>
            </div>

            <h2 className="mb-3">Listado de géneros</h2>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {generos.map((g) => (
                    <div key={g.id} className="col">
                        <div className="card h-100">
                            <img
                                src={`${g.imagen}`}
                                className="card-img-top"
                                alt={g.nombre}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{g.nombre}</h5>
                                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditar(g)}>
                                    Editar
                                </button>
                                <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(g.id)}>
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

export default GenerosAdmin;