const cancion = require("../controllers/cancion.controller");
const upload = require("../middlewares/uploadAudio");

module.exports = app => {
    const router = require("express").Router();

    router.get("/", cancion.obtenerTodasLasCanciones);
    router.get("/album/:albumId", cancion.obtenerCancionesPorAlbum);
    router.get("/:id", cancion.obtenerCancion);
    router.post("/", upload.single("archivoMp3"), cancion.crearCancion);
    router.put("/:id", upload.single("archivoMp3"), cancion.actualizarCancion);
    router.delete("/:id", cancion.eliminarCancion);

    app.use("/canciones", router);
};