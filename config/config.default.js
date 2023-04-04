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
  config.middleware = ['errorHandler'];

  config.errorHandler = {
    ignore: ['/api/v1/email/send']
  }

  // add your user config here
  const userConfig = {
    X_TI_APP_ID: 'c7194dccd18ccab5d35beac565d11020',
    X_TI_SECRET_CODE: '5746a12c7f3ec242e56d96b8dbf7fd96'
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

  config.logger = {
    outputJSON: true
  }

  config.qqEmail = {
    host: 'smtp.qq.com',		// QQ邮箱的SMTP地址
    port: 465,				 	// 邮箱的端口号一般都使用465，
    auth: {
      user: '2650006147@qq.com',
      pass: 'jnybymigwjwieafd',     // 授权码
    },
  }

  config.multipart = {
    mode: 'stream',
    fileModeMatch: /(\/bills_crop_batch)$/, // /pageTemplate接口使用file模式，其他使用stream模式
    whitelist: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    fileSize: '10mb',
    fieldSize: '1024kb',
  }

  return {
    ...config,
    ...userConfig,
  };
};
