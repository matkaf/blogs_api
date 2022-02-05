/* eslint-disable max-lines-per-function */
const PostsCategory = (sequelize, _DataTypes) => {
  const postsCategory = sequelize.define('PostsCategories',
  {}, {
    timestamps: false,
    underscored: true,
    tableName: 'PostsCategories',
    });
  postsCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: postsCategory,
      foreignKey: 'category_id',
      otherKey: 'post_id',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: postsCategory,
      foreignKey: 'post_id',
      otherKey: 'category_id',
    });
  };

  return postsCategory;
};

module.exports = PostsCategory;
