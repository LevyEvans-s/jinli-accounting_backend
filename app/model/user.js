module.exports = (app) => {
  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

  const User = app.model.define('user', {
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
    },
    qq: {
      type: BOOLEAN,
      allowNull: true,
      comment: '是否绑定QQ',
    },
    created_at: {
      type: DATE,
      get() {
        return (new Date(this.getDataValue('created_at'))).getTime()
      }
    },
    updated_at: {
      type: DATE,
      get() {
        return (new Date(this.getDataValue('updated_at'))).getTime()
      }
    }
  })

  User.associate = function () {
    app.model.User.hasMany(app.model.Oauth, {
      foreignKey: 'user_id',
      sourceKey: 'id'
    })
  }

  return User;
};