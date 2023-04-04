'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, DATE, STRING } = Sequelize
    await queryInterface.createTable('oauth', {
      id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: 'OAuth ID'
      },
      access_token: {
        type: STRING(255),
        allowNull: false,
        comment: '第三方授权令牌'
      },
      provider: {
        type: STRING(255),
        allowNull: false,
        comment: '授权来源',
        primaryKey: true
      },
      open_id: {
        type: STRING(255),
        allowNull: false,
        comment: '第三方平台用户id',
        primaryKey: true
      },
      user_id: {
        type: INTEGER.UNSIGNED,
        allowNull: false,
        comment: '所属用户',
        references: {
          model: 'user',
          key: 'id'
        }
      },
      created_at: DATE,
      updated_at: DATE,
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
