module.exports = (sequelize, DataTypes) => {
    const Album = sequelize.define("Album", {
        titulo: {
        type: DataTypes.STRING,
        allowNull: false
        },
        imagen: {
        type: DataTypes.STRING,
        allowNull: true
        }
    });

    Album.associate = models => {
        Album.belongsTo(models.Artista, {
        foreignKey: "artistaId",
        as: "artista"
        });

        Album.hasMany(models.Cancion, {
        foreignKey: "albumId",
        as: "canciones"
        });
    };

    return Album;
};  