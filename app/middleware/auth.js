module.exports = (options, app) => {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {

    }
  }
}