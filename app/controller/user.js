const Controller = require('egg').Controller;

class UserController extends Controller {
  /**
   * 用户注册
   */
  async register() {

  }

  /**
   * 用户登录
   */
  async login() {
    const { ctx } = this;
    ctx.body = {
      code: 200,
      msg: "注册成功",
      data: {
        user: "koto",
        token: "Bearer xxxxx",
        createTime: "2023-03-26"
      }
    }
  }
}

module.exports = UserController;