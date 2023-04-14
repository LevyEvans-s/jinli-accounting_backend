module.exports = {
  nickname: {
    type: 'string',
    trim: true,
    message: '用户名格式不符合要求',
    required: false
  },
  password: {
    type: 'string',
    trim: true,
    message: '密码格式不符合要求',
    required: false
  },
  gender: {
    type: 'enum',
    values: [0, 1, 2],
    message: '性别格式不符合要求',
    required: false
  },
  code: {
    type: 'string',
    trim: true,
    format: /^[0-6]{6}$/,
    message: '验证码格式不符合要求',
    required: false
  },
  email: {
    type: 'string',
    trim: true,
    required: false,
    message: '邮箱格式不符合规范',
    // format: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  }
}