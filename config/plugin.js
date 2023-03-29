'use strict';

module.exports = {
  // 开启跨域插件
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  // 开启sequelize-typescript
  // sequelize: {
  //   enable: true,
  //   package: 'egg-sequelize',
  // },
  // 开启前端数据校验
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  // // 开启Redis存储
  // sessionRedis: {
  //   enable: true,
  //   package: 'egg-session-redis',
  // },
  // redis: {
  //   enable: true,
  //   package: 'egg-redis',
  // },
  // 开启第三方登录鉴权插件
  passport: {
    enable: true,
    package: 'egg-passport',
  },
};
