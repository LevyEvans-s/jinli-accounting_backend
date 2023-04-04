const Service = require('egg').Service;

class emailService extends Service {
  async sendEmail(account) {
    const { app, ctx } = this
    const emailVerifyCode = ctx.helper.rand()

    // 服务端保存验证码 验证码有效期为10min
    ctx.session.verifyCode = {
      code: emailVerifyCode,
      expire: Date.now() + 600 * 1000
    }

    const email = {
      title: '锦鲤记账---邮箱验证码',
      body: `
                <h1>尊敬的:${account}用户</h1>
                <p style="font-size: 18px;color:#000;">
                您的验证码为：
                <span style="font-size: 20px;color:#f00;"> ${emailVerifyCode}， </span>
                您当前正在为锦鲤记账App注册账号，验证码告知他人将会导致数据信息被盗，请勿泄露
                </p>
                <p style="font-size: 1.5rem;color:#999;">该验证码5分钟内有效，请勿泄漏于他人！</p>
                `,
    }

    const emailContent = {
      from: app.config.qqEmail.auth.user || '2650006147@qq.com',
      to: `${account}`, // 收件人地址，多个收件人可以使用逗号分隔
      subject: email.title, // 邮件标题
      html: email.body, // 邮件内容
    }

    return await ctx.helper.sendEmail(emailContent)
  }


}

module.exports = emailService;