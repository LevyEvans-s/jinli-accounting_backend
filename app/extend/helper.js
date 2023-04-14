const crypto = require('crypto')
const _ = require('lodash')
const nodemailer = require('nodemailer')
const { MAIL_VERIFY_CODE_SEND_FAIL } = require('../utils/ErrorInfo')
const OSSManager = require('../utils/OSS')

function _md5(str) {
  return crypto.createHash('md5').update(str).digest('hex')
}

// 生成*位随机数 默认为6位
function rand(length = 6) {
  let Num = ''
  for (let i = 0; i < length; i++) {
    Num += Math.floor(Math.random() * 10)
  }
  return Num
}

// 发送邮箱
async function sendEmail(mailOptions) {
  const transporter = nodemailer.createTransport(this.app.config.qqEmail)
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, data) => {
      if (!err) {
        resolve({ data, msg: '邮箱验证码发送成功' })
      } else {
        reject(MAIL_VERIFY_CODE_SEND_FAIL)
      }
    })
  })

}

// 验证邮箱验证码
async function verifyEmailCode(code) {
  const { ctx } = this
  const serverCaptcha = ctx.session.verifyCode
  let serverCode;
  let serverExpire;
  console.log('验证时候的session', ctx.session)
  try {
    serverCode = serverCaptcha.code;
    serverExpire = serverCaptcha.expire;
  } catch (e) {
    ctx.throw(500, '请重新获取验证码')
  }

  if (Date.now() > serverExpire) {
    ctx.throw(500, '验证码已过期')
  }
  if (serverCode !== code) {
    ctx.throw(422, '验证码不正确')
  }
  ctx.session.verifyCode = null;
  return { code: 200, msg: '验证成功', status: true }
}

// 向合合信息请求第三方OCR接口调用
async function curlToTextin(url, options) {
  const { ctx, app } = this
  return await ctx.curl(url, {
    ...options,
    headers: {
      'x-ti-app-id': app.config.X_TI_APP_ID,
      'x-ti-secret-code': app.config.X_TI_SECRET_CODE
    }
  })
}

const OSSManagerInstance = new OSSManager()

module.exports = {
  _,
  _md5,
  rand,
  sendEmail,
  verifyEmailCode,
  curlToTextin,
  OSSManagerInstance
}