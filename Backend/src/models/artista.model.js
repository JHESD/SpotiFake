module.exports = (sequelize, DataTypes) => {
    const Artista = sequelize.define("Artista", {
        nombre: {
        type: DataTypes.STRING,
        allowNull: false
        },
        imagen: {
        type: DataTypes.STRING,
        allowNull: true
        }
    });

    Artista.associate = models => {
        Artista.belongsTo(models.Genero, {
        foreignKey: "generoId",
        as: "genero"
        });

        Artista.hasMany(models.Album, {
        foreignKey: "artistaId",
        as: "albums"
        });
    };

    return Artista;
};  