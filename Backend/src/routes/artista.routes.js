const artista = require("../controllers/artista.controller");
const upload = require("../middlewares/uploadImagen");

module.exports = app => {
    const router = require("express").Router();

    router.get("/", artista.obtenerTodosLosArtistas);
    router.get("/genero/:generoId", artista.obtenerArtistasPorGenero);
    router.get("/:id", artista.obtenerDetalleArtista);
    router.post("/", upload.single("imagen"), artista.crearArtista);
    router.put("/:id", upload.single("imagen"), artista.actualizarArtista);
    router.delete("/:id", artista.eliminarArtista);

    app.use("/artistas", router);
};