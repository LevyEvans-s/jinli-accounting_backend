// 用户名已存在
const REGISTER_USERNAME_EXIST = {
  errno: 10001,
  msg: '用户名已存在',
}

// 注册失败
const REGISTER_FAIL = {
  errno: 10002,
  msg: '注册失败'
}
// 用户名不存在
const REGISTER_USERNAME_NOT_EXIST = {
  errno: 10003,
  msg: '用户名未存在'
}
// 登录失败
const LOGIN_FAIL = {
  errno: 10004,
  msg: '登录失败，用户名或密码错误'
}

// 未登录
const LOGIN_CHECK_FAIL = {
  errno: 10005,
  msg: '您尚未登录'
}

// 邮箱验证码发送失败
const MAIL_VERIFY_CODE_SEND_FAIL = {
  errno: 10006,
  msg: '验证码发送失败，请稍后重试'
}

// 邮箱格式错误
const MAIL_FORMAT_ERROR = {
  errno: 10007,
  msg: '邮箱格式错误'
}

module.exports = {
  REGISTER_USERNAME_EXIST,
  REGISTER_FAIL,
  REGISTER_USERNAME_NOT_EXIST,
  LOGIN_FAIL,
  LOGIN_CHECK_FAIL,
  MAIL_VERIFY_CODE_SEND_FAIL,
  MAIL_FORMAT_ERROR
}