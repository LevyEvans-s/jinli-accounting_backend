module.exports = {
  success(data = {}, msg = '请求成功', status = 200) {
    this.status = status; // RESTful API的响应状态
    this.body = {
      code: status,
      msg: msg,
      data: data
    }
  },
  error({ errno, msg }, status = 500) {
    this.status = status;
    this.body = {
      errno,
      msg
    }
  }
}