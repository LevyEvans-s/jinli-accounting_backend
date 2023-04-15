module.exports = (app) => {
  const { router, controller } = app;

  router.post('/gpt/sendMsg', controller.gpt.sendMsg);
}