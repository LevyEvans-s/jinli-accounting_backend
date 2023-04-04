module.exports = {
  provider: {
    type: 'string',
    trim: true,
    message: 'provider不符合要求',
    required: true
  },
  accessToken: {
    type: 'string',
    trim: true,
    message: 'accessToken不符合要求',
    required: true
  },
  openId: {
    type: 'string',
    trim: true,
    message: 'openId不符合要求',
    required: true
  },
  password: {
    type: 'string',
    trim: true,
    message: '密码不符合要求',
    required: false
  },
  type: {
    type: 'enum',
    values: ['normal', 'email', 'qq', 'phone'],
    message: '注册类型不符合要求',
    required: true
  },
}
