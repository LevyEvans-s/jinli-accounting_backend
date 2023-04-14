module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize

  const Sign = app.model.define('sign', {
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
    },
    date: {
      type: String(255),
      allowNull: false,
      comment: '打卡日期'
    },
    created_at: DATE,
    updated_at: DATE,
  })

  Sign.associate = function () {
    app.model.Sign.belongsTo(app.model.User, {
      foreignKey: 'user_id',
      targetKey: 'id'
    })
  }
  return Sign
}