'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.prefix('/api/v1'); // 设置基础路径

  require('./router/user.js')(app)
  require('./router/email.js')(app)
  require('./router/receipt.js')(app)
};
