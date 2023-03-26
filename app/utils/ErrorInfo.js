// 用户名已存在
const registerUserNameExistInfo = {
  errno: 10001,
  msg: '用户名已存在',
}

// 注册失败
const registerFailInfo = {
  errno: 10002,
  msg: '注册失败，请重试'
}
// 用户名不存在
const registerUserNameNotExistInfo = {
  errno: 10003,
  msg: '用户名未存在'
}
// 登录失败
const loginFailInfo = {
  errno: 10004,
  msg: '登录失败，用户名或密码错误'
}

// 未登录
const loginCheckFailInfo = {
  errno: 10005,
  msg: '您尚未登录'
}

module.exports = {
  registerUserNameExistInfo,
  registerFailInfo,
  registerUserNameNotExistInfo,
  loginFailInfo
  loginCheckFailInfo
}