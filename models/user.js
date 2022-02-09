const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    // n adicionar coluna com autoIncrement no model, causa erro na findOrCreate
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  user.associate = (models) => {
    user.hasMany(models.BlogPost, {
      foreignKey: 'userId', as: 'blogposts',
    });
  };
  return user;
};

module.exports = User;
