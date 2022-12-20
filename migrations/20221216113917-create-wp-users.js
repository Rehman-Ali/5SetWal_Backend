'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('wp_users', {
      ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      user_login: {
        type: Sequelize.STRING
      },
      user_pass: {
        type: Sequelize.STRING
      },
      user_nicename: {
        type: Sequelize.STRING
      },
      user_email: {
        type: Sequelize.STRING
      },
      user_url: {
        type: Sequelize.STRING
      },
      user_registered: {
        type: Sequelize.DATE
      },
      user_activation_key: {
        type: Sequelize.STRING
      },
      user_status: {
        type: Sequelize.INTEGER
      },
      display_name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()

      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()

      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('wp_users');
  }
};