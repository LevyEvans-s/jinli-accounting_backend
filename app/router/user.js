module.exports = (app) => {
  const { router, controller } = app;

  router.post('/user/register', controller.user.register);
  router.post('/user/login', controller.user.login)
}