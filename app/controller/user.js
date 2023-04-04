const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
const emailUserRule = require('../validate/emailUserRule');
const qqUserRule = require('../validate/qqUserRule');

class UserController extends Controller {
  /**
   * 用户注册
   */
  async register() {
    const { ctx } = this
    try {
      // 校验数据和验证码
      await this.validateUserInfo()
      await this.validateUserCode()
      // 将校验通过的数据保存到数据库中
      const data = await ctx.service.user.createUser(ctx.request.body)
      ctx.success(data, '创建用户成功')
    } catch (e) {
      ctx.throw(e.status, e.message)
    }
  }

  /**
   * 用户登录
   */
  async login() {
    const { ctx } = this
    try {
      // 校验数据
      this.validateUserInfo()
      const data = ctx.request.body
      // 将校验通过的数据保存到数据库中
      const user = await ctx.service.user.getUser(data)
      delete user.password
      // 生成JWT令牌
      const token = jwt.sign(user, this.config.keys, { expiresIn: '7 days' })
      ctx.cookies.set('token', token, {
        path: '/',
        maxAge: 24 * 3600 * 1000,
        httpOnly: false,
        signed: false,
      })
      ctx.session.user = user
      ctx.success({ ...user, token }, '登录成功')
    } catch (e) {
      ctx.throw(e.status, e.message)
    }
  }

  async validateUserInfo() {
    const { ctx } = this
    const data = ctx.request.body
    const type = data.type
    // 校验数据的格式是否正确
    switch (type) {
      case 'email':
        ctx.validate(emailUserRule, data)
        break
      case 'qq':
        ctx.validate(qqUserRule, data)
        break
      default:
        ctx.throw(422, '注册类型不存在')
    }
  }

  async validateUserCode() {
    const { ctx } = this;
    const data = ctx.request.body;
    const type = data.type;
    switch (type) {
      case 'email':
        // 校验邮箱验证码
        await ctx.helper.verifyEmailCode(data.code)
        break;
      case 'qq':
        // uniapp客户端直接向第三方发起校验 本地Node服务端无需处理
        break;
      default:
        ctx.throw(422, '注册类型不存在');
    }
  }
}

module.exports = UserController;