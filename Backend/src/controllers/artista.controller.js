const db = require("../models");
const Artista = db.Artista;
const Album = db.Album;
const Cancion = db.Cancion;

exports.obtenerArtistasPorGenero = async (req, res) => {
    try {
        const { generoId } = req.params;
        const artistas = await Artista.findAll({ where: { generoId } });
        res.json(artistas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.obtenerDetalleArtista = async (req, res) => {
    try {
        const { id } = req.params;

        const artista = await Artista.findByPk(id, {
        include: {
            model: Album,
            as: "albums",
            include: {
            model: Cancion,
            as: "canciones"
            }
        }
        });

        if (!artista) return res.status(404).json({ mensaje: "Artista no encontrado" });

        res.json(artista);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.crearArtista = async (req, res) => {
    try {
        const { nombre, generoId } = req.body;
        const imagen = req.file?.filename;

        if (!nombre || !generoId) {
        return res.status(400).json({ mensaje: "Nombre y género son obligatorios." });
        }

        const nuevoArtista = await db.Artista.create({
        nombre,
        generoId,
        imagen: imagen ? `/uploads/img/${imagen}` : null
        });

        res.status(201).json(nuevoArtista);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.obtenerTodosLosArtistas = async (req, res) => {
    try {
        const artistas = await Artista.findAll();
        res.json(artistas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.actualizarArtista = async (req, res) => {
    try {
        const { nombre, generoId } = req.body;
        const imagen = req.file?.filename;

        const artista = await Artista.findByPk(req.params.id);
        if (!artista) {
            return res.status(404).json({ mensaje: "Artista no encontrado" });
        }

        artista.nombre = nombre ?? artista.nombre;
        artista.generoId = generoId ?? artista.generoId;

        if (imagen) {
            artista.imagen = `/uploads/img/${imagen}`;
        }

        await artista.save();
        res.json(artista);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.eliminarArtista = async (req, res) => {
    try {
        const artista = await Artista.findByPk(req.params.id);
        if (!artista) {
            return res.status(404).json({ mensaje: "Artista no encontrado" });
        }

        await artista.destroy();
        res.json({ mensaje: "Artista eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};