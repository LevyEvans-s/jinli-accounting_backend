const Controller = require('egg').Controller;
const { MAIL_FORMAT_ERROR } = require('../utils/ErrorInfo')
class emailController extends Controller {
  // 发送邮件
  async send() {
    const { ctx } = this
    const { email } = this.ctx.request.body

    // 校验邮箱格式
    const emailRegExp = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
    if (!emailRegExp.test(email))
      return ctx.error(MAIL_FORMAT_ERROR, 422)

    const result = await ctx.service.email.sendEmail(email)
    if (!result.errno) {
      ctx.success(result.data, result.msg)
    } else {
      ctx.error(result)
    }
  }

  // 校验邮箱验证码
  // 注意点: 验证码无论验证成功还是失败, 都只能使用一次
  async verify() {
    const { ctx } = this
    const { code } = ctx.request.body
    try {
      await ctx.helper.verifyEmailCode(code)
      ctx.success({}, '邮箱验证成功')
    } catch (err) {
      ctx.throw(err.status, err.message)
    }
  }
}

module.exports = emailController;