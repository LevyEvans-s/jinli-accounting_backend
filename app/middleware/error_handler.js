module.exports = (options) => {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx)

      const { status, message, errors } = err

      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const msg =
        status === 500 && ctx.app.config.env === 'prod'
          ? 'Internal Server Error'
          : message

      ctx.status = status || 500
      ctx.body = {
        errno: errors ? errors.errno : status,
        msg: errors ? errors.msg : msg,
      }
    }
  }
}

/**
 * 业务层抛错方法 this.ctx.throw(status,message,errors)
 * 参数@status -> 422
 * 参数@message -> 'Validation Failed'
 * 参数@errors -> {errors:ErrorInfo}
 * 
 * 返回错误信息示例：
 * 服务端错误 {errno:500,msg:'Internal Server Error'}
 * 客户端错误 {errno:10001,msg:'用户名已存在'}
 */