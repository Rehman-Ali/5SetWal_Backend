'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('wp_posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ID: {
        type: Sequelize.BIGINT
      },
      post_author: {
        type: Sequelize.BIGINT
      },
      post_date: {
        type: Sequelize.DATE
      },
      post_date_gmt: {
        type: Sequelize.DATE
      },
      post_content: {
        type: Sequelize.TEXT
      },
      post_title: {
        type: Sequelize.STRING
      },
      post_excerpt: {
        type: Sequelize.STRING
      },
      post_status: {
        type: Sequelize.STRING
      },
      comment_status: {
        type: Sequelize.STRING
      },
      ping_status: {
        type: Sequelize.STRING
      },
      post_password: {
        type: Sequelize.STRING
      },
      post_name: {
        type: Sequelize.STRING
      },
      to_ping: {
        type: Sequelize.STRING
      },
      pinged: {
        type: Sequelize.STRING
      },
      post_modified: {
        type: Sequelize.DATE
      },
      post_modified_gmt: {
        type: Sequelize.DATE
      },
      post_content_filtered: {
        type: Sequelize.TEXT
      },
      post_parent: {
        type: Sequelize.BIGINT
      },
      guid: {
        type: Sequelize.STRING
      },
      menu_order: {
        type: Sequelize.INTEGER
      },
      post_type: {
        type: Sequelize.STRING
      },
      post_mime_type: {
        type: Sequelize.STRING
      },
      comment_count: {
        type: Sequelize.BIGINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('wp_posts');
  }
};