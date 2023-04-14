module.exports = (app) => {
  const { router, controller } = app;

  router.post('/user/register', controller.user.register);
  router.post('/user/login', controller.user.login)
  router.post('/user/update', controller.user.update)
  router.post('/user/sign', controller.user.sign)
  router.get('/user/sign_days', controller.user.getSignDays)
  router.get('/user/is_signed', controller.user.isSigned)
}