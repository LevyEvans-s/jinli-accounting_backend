const Service = require('egg').Service;
const { v4: uuidv4 } = require('uuid');

class UserService extends Service {
  async getUser(options) {
    const { ctx } = this
    options.password = ctx.helper._md5(options.password);
    try {
      if (options.type === 'email') {
        const res = await ctx.model.User.findOne({
          raw: true,
          where: {
            email: options.email,
            password: options.password
          },
          attributes: {
            exclude: ['created_at', 'updated_at']
          }
        })
        return res
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
    } catch (e) {
      ctx.throw(422, '账户或者密码不正确')
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
      return await this.ctx.model.Oauth.findOne({
        raw: true,
        where: {
          open_id: options.openId,
          provider: options.provider
        },
        attributes: {
          exclude: ['created_at', 'updated_at']
        },
        include: {
          model: this.app.model.User
        }
      })
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
      username: uuidv4(),
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
      username: uuidv4(), // 用户名不能为空
      qq: true
    };
    const newUser = await this.ctx.model.User.create(userInfo);
    const oauthInfo = {
      password: options.password,
      access_token: options.accessToken,
      provider: options.provider,
      user_id: newUser ? newUser.id : -1,
      open_id: options.openId
    }
    // TODO:session
    return await this.ctx.model.Oauth.create(oauthInfo);
  }
}

module.exports = UserService;