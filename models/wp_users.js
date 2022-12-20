'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wp_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  wp_users.init({
    ID:{ 
     type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    user_login: DataTypes.STRING,
    user_pass: DataTypes.STRING,
    user_nicename: DataTypes.STRING,
    user_email: DataTypes.STRING,
    user_url: DataTypes.STRING,
    user_registered: DataTypes.DATE,
    user_activation_key: DataTypes.STRING,
    user_status: DataTypes.INTEGER,
    display_name: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'wp_users',
    timestamps: false
 
  });
  return wp_users;
};