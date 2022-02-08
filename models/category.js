const Category = (sequelize, DataTypes) => {
  const category = sequelize.define('Category', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'Categories',
  });

  return category;
};

module.exports = Category;
