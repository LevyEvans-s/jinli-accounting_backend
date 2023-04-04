exports.cluster = {
  listen: {
    path: '',
    port: 7001,
    hostname: '0.0.0.0',
  }
}

exports.sequelize = {
  dialect: 'mysql',
  host: '127.0.0.1',
  username: 'root',
  password: 'root',
  port: 3306,
  database: 'jinli',
  timezone: '+08:00',
  define: {
    // 取消数据表名复数
    freezeTableName: true,
    // 自动写入时间戳 created_at updated_at
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
};

exports.redis = {
  client: {
    host: '127.0.0.1',
    port: 6379,
    password: '',
    db: 0,
  }
}