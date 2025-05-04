module.exports = app => {
    require("./artista.routes")(app);
    require("./album.routes")(app);
    require("./cancion.routes")(app);
    require("./genero.routes")(app);
}