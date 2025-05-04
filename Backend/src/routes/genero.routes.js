const genero = require("../controllers/genero.controller");
const upload = require("../middlewares/uploadImagen");

module.exports = app => {
    const router = require("express").Router();

    router.get("/", genero.obtenerGeneros);
    router.get("/:id", genero.obtenerGeneroPorId);
    router.post("/cg", upload.single("imagen"), genero.crearGenero);
    router.put("/:id", upload.single("imagen"), genero.actualizarGenero);
    router.delete("/:id", genero.eliminarGenero);
    
    app.use("/generos", router);
};