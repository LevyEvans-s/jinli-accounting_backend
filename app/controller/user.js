const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
const emailUserRule = require('../validate/emailUserRule');
const normalUserRule = require('../validate/normalUserRule');
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
      // await this.validateUserCode()
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
      delete user.created_at
      delete user.updated_at
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

  /**
   * 用户信息编辑
   */
  async update() {
    const { ctx } = this
    try {
      this.validateUserInfo()
      const { id } = ctx.query
      const data = ctx.request.body
      const res = await ctx.service.user.updateUser(id, data)
      ctx.success(res, '更新用户信息成功')
    } catch (err) {
      if (err.errors) {
        ctx.throw(err.status, err.message, {
          errors: {
            ...err.errors
          }
        })
      }
      ctx.throw(err.status, err.message)
    }
  }

  /**
   * 用户打卡
   */
  async sign() {
    const { ctx } = this
    const { id, date } = ctx.query
    // 增加打卡记录
    try {
      const res = await ctx.model.Sign.findOne({
        raw: true,
        where: {
          user_id: id,
          date
        }
      })
      if (res) {
        ctx.throw(422, '该日期已添加过记录')
      } else {
        const data = await ctx.service.user.userSign(id, date)
        ctx.success(data, '打卡成功')
      }
    } catch (err) {
      ctx.throw(err.status, err.message)
    }
  }

  /**
   * 查询所有打卡日期
   */
  async getSignDays() {
    const { ctx } = this
    const id = ctx.query.id
    // 查询打卡天数
    try {
      const days = await ctx.model.Sign.findAll({
        where: {
          user_id: id
        }
      })
      const selectedDays = days.map(day => {
        return { date: day.date, info: '已打卡' }
      })
      ctx.success(selectedDays, '查询打卡天数成功')
    } catch (err) {
      ctx.throw(err.status, err.message)
    }
  }

  /**
   * 查询某日是否已打卡
   */
  async isSigned() {
    const { ctx } = this
    const { date, id } = ctx.query
    try {
      const data = await ctx.model.Sign.findOne({
        raw: true,
        where: {
          user_id: id,
          date
        }
      })
      if (data) {
        ctx.success(data, '该日期已打卡')
      } else {
        ctx.success(null, '该日期暂无打卡记录')
      }

    } catch (err) {
      ctx.throw(err.status, err.message)
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
      case 'normal':
        ctx.validate(normalUserRule, data)
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