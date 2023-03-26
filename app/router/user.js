module.exports = (app) => {
  const { router, controller } = app;

  // 设置用户模块基础路径/user
  router.prefix('/user');

  router.post('/register', controller.user.register);
  router.post('/login', controller.user.login)
}