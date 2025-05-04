const { sequelize, Sequelize } = require("../config/db.config");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Genero = require("./genero.model")(sequelize, Sequelize.DataTypes);
db.Artista = require("./artista.model")(sequelize, Sequelize.DataTypes);
db.Album = require("./album.model")(sequelize, Sequelize.DataTypes);
db.Cancion = require("./cancion.model")(sequelize, Sequelize.DataTypes);

db.Genero.hasMany(db.Artista, { foreignKey: "generoId", as: "artistas" });
db.Artista.belongsTo(db.Genero, { foreignKey: "generoId", as: "genero" });

db.Artista.hasMany(db.Album, { foreignKey: "artistaId", as: "albums" });
db.Album.belongsTo(db.Artista, { foreignKey: "artistaId", as: "artista" });

db.Album.hasMany(db.Cancion, { foreignKey: "albumId", as: "canciones" });
db.Cancion.belongsTo(db.Album, { foreignKey: "albumId", as: "album" });

module.exports = db;