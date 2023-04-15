const Service = require('egg').Service;
const { v4: uuidv4 } = require('uuid');
const { MAIL_EXISTS } = require('../utils/ErrorInfo')
class UserService extends Service {
  async getUser(options) {
    const { ctx } = this
    options.password = options.password ? ctx.helper._md5(options.password) : '';
    if (options.type === 'email') {
      const result = await ctx.model.User.findOne({
        where: {
          email: options.email,
          password: options.password
        },
      })
      if (result) {
        const res = result['dataValues']
        const endTime = new Date().getTime() / 1000 - parseInt(new Date(res.created_at).getTime() / 1000);
        const total_days = parseInt(endTime / 60 / 60 / 24) + 1   //记账天数
        //更新用户的记账天数
        await result.update({ ...res, total_days },
          {
            where: {
              id: res.id
            }
          }
        )
        return { ...res, total_days }
      } else {
        ctx.throw(422, '邮箱或密码不正确')
      }
    } else if (options.type === 'qq') {
      const userOauthData = await this.findUser(options) // oauth表和user表联合查询的结果
      // 根据user_id查询user表
      if (userOauthData) {
        const userData = await ctx.model.User.findByPk(userOauthData.user_id)
        return {
          ...userData['dataValues'],
          accessToken: userOauthData.access_token,
          openId: userOauthData.open_id
        }
      } else {
        ctx.throw(422, '没有该用户')
      }
    }
  }


  async createUser(options) {
    if (options.password)
      options.password = this.ctx.helper._md5(options.password);
    if (options.type === 'email') {
      return await this.createUserByEmail(options);
    } else if (options.type === 'qq') {
      return await this.createUserByQQ(options);
    }
  }

  // 查找用户是否已存在
  async findUser(options) {
    if (options.type === 'email') {
      return await this.ctx.model.User.findOne({
        raw: true,
        where: {
          email: options.email,
          password: options.password
        }
      })
    } else if (options.type === 'qq') {
      const res = await this.ctx.model.Oauth.findOne({
        raw: true,
        where: {
          open_id: options.openId,
          provider: options.provider
        },
        attributes: {
          exclude: ['created_at', 'updated_at']
        },
        include: {
          model: this.app.model.User,
        }
      })
      return res
    }
  }

  async createUserByEmail(options) {
    // 1.查询当前用户是否存在
    const user = await this.findUser(options);
    if (user) {
      this.ctx.throw(422, '当前用户已存在');
    }
    // 2.如果不存在才保存
    const data = await this.ctx.model.User.create({
      nickname: uuidv4(), // 用户名不能为空,随机生成
      email: options.email,
      password: options.password
    });
    const userData = data['dataValues'];
    delete userData.password;
    return userData;
  }

  async createUserByQQ(options) {
    // 1.查询当前用户是否存在
    const user = await this.findUser(options);
    if (user) {
      this.ctx.throw(422, '当前用户已存在');
    }
    // 2.如果不存在则新创建一个User 再关联OAuth
    const userInfo = {
      nickname: options.nickname ? options.nickname : uuidv4(),
      gender: options.gender ? options.gender : 0,
      avatar: options.avatar ? options.avatar : this.app.config.defaultAvatar,
      qq: true
    };
    const newUser = await this.ctx.model.User.create(userInfo);
    const oauthInfo = {
      access_token: options.accessToken,
      provider: options.provider,
      user_id: newUser ? newUser.id : -1,
      open_id: options.openId
    }
    return await this.ctx.model.Oauth.create(oauthInfo);
  }

  async updateUser(id, data) {
    const { ctx } = this
    const userData = await ctx.model.User.findByPk(id)
    let updatedUserData
    try {
      if (userData) {
        switch (data.type) {
          case 'normal':
            delete data.type
            updatedUserData = await userData.update(data, {
              where: {
                id: id
              }
            })
            break
          case 'email':
            const verifyRes = await ctx.helper.verifyEmailCode(data.code)
            if (verifyRes.status) {
              delete data.code
              delete data.type
              const emailExist = await ctx.model.User.findOne({
                where: { email: data.email }
              })
              if (emailExist) ctx.throw(422, 'validation failed', { errors: { ...MAIL_EXISTS } })
              updatedUserData = await userData.update(data, {
                where: {
                  id: id
                }
              })
            }
            break
          default:
            ctx.throw(422, '没有传入待更新的用户信息类型')
        }
        if (updatedUserData) {
          return ctx.helper._.pick(updatedUserData['dataValues'], ['id', 'nickname', 'email', 'gender', 'avatar', 'qq', 'sign_days', 'total_days'])
        } else {
          ctx.throw(422, '用户信息更新失败')
        }
      } else {
        ctx.throw(422, '用户不存在')
      }
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

  // 增加打卡记录
  async userSign(id, date) {
    const { ctx } = this
    const data = await ctx.model.Sign.create({
      user_id: id,
      date
    })
    await ctx.model.User.increment({
      sign_days: 1
    }, {
      where: {
        id: id
      }
    })
    return data['dataValues'];
  }
}
module.exports = UserService;