module.exports = (sequelize, DataTypes) => {
    const Cancion = sequelize.define("Cancion", {
        titulo: {
        type: DataTypes.STRING,
        allowNull: false
        },
        archivoMp3: {
        type: DataTypes.STRING,
        allowNull: false
        }
    });

    Cancion.associate = models => {
        Cancion.belongsTo(models.Album, {
        foreignKey: "albumId",
        as: "album"
        });
    };

    return Cancion;
};