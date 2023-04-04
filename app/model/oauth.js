module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize

  const Oauth = app.model.define('oauth', {
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
    },
    created_at: DATE,
    updated_at: DATE
  })

  Oauth.associate = function () {
    app.model.Oauth.belongsTo(app.model.User, {
      foreignKey: 'user_id',
      targetKey: 'id'
    })
  }
  return Oauth
}