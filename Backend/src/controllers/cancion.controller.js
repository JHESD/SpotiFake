const db = require("../models");
const Cancion = db.Cancion;
const Album = db.Album;

exports.crearCancion = async (req, res) => {
    try {
        const { titulo, albumId, tituloAlbum, artistaId } = req.body;
        const archivoMp3 = req.file?.filename;

        if (!archivoMp3) return res.status(400).json({ mensaje: "Archivo MP3 requerido." });

        let album;

        if (albumId) {
        album = await Album.findByPk(albumId);
        } else {
        if (!tituloAlbum || !artistaId)
            return res.status(400).json({ mensaje: "Datos de álbum requeridos." });

        album = await Album.create({ titulo: tituloAlbum, artistaId });
        }

        const nuevaCancion = await Cancion.create({
        titulo,
        archivoMp3: `/uploads/aud/${archivoMp3}`,
        albumId: album.id
        });

        res.status(201).json(nuevaCancion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.obtenerCancionesPorAlbum = async (req, res) => {
    try {
        const { albumId } = req.params;
        const canciones = await Cancion.findAll({ where: { albumId } });
        res.json(canciones);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.obtenerCancion = async (req, res) => {
    try {
        const { id } = req.params;

        const cancion = await Cancion.findByPk(id);

        if (!cancion) return res.status(404).json({ mensaje: "Canción no encontrada" });

        res.json(cancion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.obtenerTodasLasCanciones = async (req, res) => {
    try {
        const canciones = await Cancion.findAll();
        res.json(canciones);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.actualizarCancion = async (req, res) => {
    try {
        const { titulo, albumId } = req.body;
        const archivoMp3 = req.file?.filename;

        const cancion = await Cancion.findByPk(req.params.id);
        if (!cancion) {
            return res.status(404).json({ mensaje: "Canción no encontrada" });
        }

        cancion.titulo = titulo ?? cancion.titulo;
        cancion.albumId = albumId ?? cancion.albumId;

        if (archivoMp3) {
            cancion.archivoMp3 = `/uploads/aud/${archivoMp3}`;
        }

        await cancion.save();
        res.json(cancion);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.eliminarCancion = async (req, res) => {
    try {
        const cancion = await Cancion.findByPk(req.params.id);
        if (!cancion) {
            return res.status(404).json({ mensaje: "Canción no encontrada" });
        }

        await cancion.destroy();
        res.json({ mensaje: "Canción eliminada correctamente" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};