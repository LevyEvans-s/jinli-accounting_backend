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
    nickname: {
      type: STRING(255),
      allowNull: false,
      defaultValue: '',
      comment: '用户名',
    },
    password: {
      type: STRING(255),
      allowNull: true,
      defaultValue: '',
      comment: '密码',
    },
    avatar: {
      type: STRING(255),
      allowNull: true,
      defaultValue: 'https://jinli-accounting.oss-cn-shanghai.aliyuncs.com/static/image/avatar.jpg',
      comment: '用户头像'
    },
    gender: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '性别'
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
    sign_days: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "累积打卡天数"
    },
    total_days: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "使用天数"
    },
    total_bills: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "记账笔数"
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