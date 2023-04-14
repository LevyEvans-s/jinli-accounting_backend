'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { INTEGER, STRING, DATE } = Sequelize;
    await queryInterface.createTable('sign', {
      id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: '打卡id',
      },
      user_id: {
        type: INTEGER.UNSIGNED,
        allowNull: false,
        comment: '用户id',
        references: {
          model: 'user',
          key: 'id'
        }
      },
      date: {
        type: STRING,
        allowNull: false,
        comment: '打卡日期'
      },
      created_at: DATE,
      updated_at: DATE,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sign');
  }
};
