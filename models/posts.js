'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      posts.belongsTo(models.categories, {
        foreignKey: "category_id"
      }),
      posts.hasMany(models.tags, {
        foreignKey: "post_id"
      })
    }
  };
  posts.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'posts',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return posts;
};