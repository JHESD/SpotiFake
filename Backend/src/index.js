const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const db = require("./models");

db.sequelize.sync({ force: false })
  .then(() => {
    console.log("Base de datos sincronizada");
  })
  .catch(err => {
    console.error("Error al sincronizar la base de datos:", err.message);
});

require("./routes")(app);

app.get("/", (req, res) => {
  res.json({ mensaje: "API tipo Spotify funcionando 🎵" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});