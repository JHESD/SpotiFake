const album = require("../controllers/album.controller");
const upload = require("../middlewares/uploadImagen");

module.exports = app => {
    const router = require("express").Router();

    router.get("/", album.obtenerTodosLosAlbums);
    router.get("/artista/:artistaId", album.obtenerAlbumsPorArtista);
    router.post("/", upload.single("imagen"), album.crearAlbum);
    router.put("/:id", upload.single("imagen"), album.actualizarAlbum);
    router.delete("/:id", album.eliminarAlbum);

    app.use("/albums", router);
};