module.exports = (app) => {
  const { router, controller } = app;

  router.post('/email/send', controller.email.send);
  router.post('/email/verify', controller.email.verify)
}