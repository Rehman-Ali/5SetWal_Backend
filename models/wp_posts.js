'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wp_posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  wp_posts.init({
    ID:{ 
      type: DataTypes.BIGINT,
       autoIncrement: true,
       primaryKey: true,
     },
    post_author: DataTypes.BIGINT,
    post_date: DataTypes.DATE,
    post_date_gmt: DataTypes.DATE,
    post_content: DataTypes.TEXT,
    post_title: DataTypes.STRING,
    post_excerpt: DataTypes.STRING,
    post_status: DataTypes.STRING,
    comment_status: DataTypes.STRING,
    ping_status: DataTypes.STRING,
    post_password: DataTypes.STRING,
    post_name: DataTypes.STRING,
    to_ping: DataTypes.STRING,
    pinged: DataTypes.STRING,
    post_modified: DataTypes.DATE,
    post_modified_gmt: DataTypes.DATE,
    post_content_filtered: DataTypes.TEXT,
    post_parent: DataTypes.BIGINT,
    guid: DataTypes.STRING,
    menu_order: DataTypes.INTEGER,
    post_type: DataTypes.STRING,
    post_mime_type: DataTypes.STRING,
    comment_count: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'wp_posts',
    timestamps: false
  });
  return wp_posts;
};