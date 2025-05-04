const db = require("../models");
const Genero = db.Genero;

exports.obtenerGeneros = async (req, res) => {
    try {
        const generos = await Genero.findAll();

        const generosConUrl = generos.map(genero => {
            return {
                ...genero.toJSON(),
                imagen: genero.imagen
                    ? `http://localhost:3000/${genero.imagen.replace(/^\.\/+/, "")}`
                    : null
            };
        });

        res.json(generosConUrl);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.crearGenero = async (req, res) => {
    try {
        const { nombre } = req.body;
        const imagen = req.file?.filename;

        const genero = await Genero.create({
        nombre,
        imagen: imagen ? `./uploads/img/${imagen}` : null
        });

        res.status(201).json(genero);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.obtenerGeneroPorId = async (req, res) => {
    try {
        const genero = await Genero.findByPk(req.params.id);
        if (!genero) {
            return res.status(404).json({ mensaje: "Género no encontrado" });
        }

        const generoConUrl = {
            ...genero.toJSON(),
            imagen: genero.imagen
                ? `http://localhost:3000/${genero.imagen.replace(/^\.\/+/, "")}`
                : null
        };

        res.json(generoConUrl);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.actualizarGenero = async (req, res) => {
    try {
        const { nombre } = req.body;
        const imagen = req.file?.filename;

        const genero = await Genero.findByPk(req.params.id);
        if (!genero) {
            return res.status(404).json({ mensaje: "Género no encontrado" });
        }

        genero.nombre = nombre ?? genero.nombre;
        if (imagen) {
            genero.imagen = `./uploads/img/${imagen}`;
        }

        await genero.save();
        res.json(genero);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.eliminarGenero = async (req, res) => {
    try {
        const genero = await Genero.findByPk(req.params.id);
        if (!genero) {
            return res.status(404).json({ mensaje: "Género no encontrado" });
        }

        await genero.destroy();
        res.json({ mensaje: "Género eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};