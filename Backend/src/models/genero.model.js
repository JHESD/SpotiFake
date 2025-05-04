module.exports = (sequelize, DataTypes) => {
    const Genero = sequelize.define("Genero", {
        nombre: {
        type: DataTypes.STRING,
        allowNull: false
        },
        imagen: {
        type: DataTypes.STRING,
        allowNull: true
        }
    });

    Genero.associate = models => {
        Genero.hasMany(models.Artista, {
        foreignKey: "generoId",
        as: "artistas"
        });
    };

    return Genero;
};