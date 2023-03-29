/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1679813154362_4252';

  // add your middleware config here
  config.middleware = [];

  config.cluster = {
    listen: {
      path: '',
      port: 7001,
      hostname: '0.0.0.0',
    }
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 跨域相关配置
  config.cors = {
    origin: '*', // 允许哪个地址跨域请求
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH', // 允许哪些方法跨域请求
    credentials: true // 允许前端携带cookie
  };

  // 关闭csrf
  config.security = {
    csrf: {
      enable: false
    }
  }

  return {
    ...config,
    ...userConfig,
  };
};
