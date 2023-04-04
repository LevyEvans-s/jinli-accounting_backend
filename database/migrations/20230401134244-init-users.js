module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, BOOLEAN } = Sequelize;
    await queryInterface.createTable('user', {
      id: {
        type: INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: '用户ID',
      },
      username: {
        type: STRING(255),
        allowNull: false,
        defaultValue: '',
        comment: '用户名',
      },
      password: {
        type: STRING(255),
        allowNull: false,
        defaultValue: '',
        comment: '密码',
      },
      email: {
        type: STRING(255),
        allowNull: true,
        unique: true,
        comment: '用户邮箱',
      },
      qq: {
        type: BOOLEAN,
        allowNull: true,
        comment: '是否绑定QQ',
      },
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 user 表
  down: async (queryInterface) => {
    await queryInterface.dropTable('user');
  },
};