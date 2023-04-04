module.exports = {
  email: {
    type: 'string',
    trim: true,
    format: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    message: '邮箱验不符合要求'
  },
  password: {
    type: 'string',
    trim: true,
    // 必须是数字字母符号组合
    message: '密码不符合要求'
  },
  type: {
    type: 'enum',
    values: ['normal', 'email', 'qq', 'phone'],
    message: '注册类型不符合要求'
  }
}
