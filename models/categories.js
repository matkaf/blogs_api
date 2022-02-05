const Categorie = (sequelize, DataTypes) => {
  const categorie = sequelize.define('Categorie', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  return categorie;
};

module.exports = Categorie;
