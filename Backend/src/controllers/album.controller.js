const db = require("../models");
const Album = db.Album;
const Cancion = db.Cancion;

exports.obtenerAlbumsPorArtista = async (req, res) => {
    try {
        const { artistaId } = req.params;
        const albums = await Album.findAll({
        where: { artistaId },
        include: [{ model: Cancion, as: "canciones" }]
        });
        res.json(albums);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.crearAlbum = async (req, res) => {
    try {
        const { titulo, artistaId } = req.body;
        const imagen = req.file?.filename;

        const album = await Album.create({
        titulo,
        artistaId,
        imagen: imagen ? `/uploads/img/${imagen}` : null
        });

        res.status(201).json(album);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.obtenerTodosLosAlbums = async (req, res) => {
    try {
        const albums = await Album.findAll();
        res.json(albums);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.actualizarAlbum = async (req, res) => {
    try {
        const { titulo, artistaId } = req.body;
        const imagen = req.file?.filename;

        const album = await Album.findByPk(req.params.id);
        if (!album) {
            return res.status(404).json({ mensaje: "Álbum no encontrado" });
        }

        album.titulo = titulo ?? album.titulo;
        album.artistaId = artistaId ?? album.artistaId;

        if (imagen) {
            album.imagen = `/uploads/img/${imagen}`;
        }

        await album.save();
        res.json(album);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.eliminarAlbum = async (req, res) => {
    try {
        const album = await Album.findByPk(req.params.id);
        if (!album) {
            return res.status(404).json({ mensaje: "Álbum no encontrado" });
        }

        await album.destroy();
        res.json({ mensaje: "Álbum eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};