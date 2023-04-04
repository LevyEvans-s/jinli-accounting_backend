'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.prefix('/api/v1'); // 设置基础路径

  require('./router/user')(app)
  require('./router/email')(app)
  require('./router/receipt')(app)
};
