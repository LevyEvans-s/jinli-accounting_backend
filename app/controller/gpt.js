const Controller = require('egg').Controller;

class CharGPTController extends Controller {
  async sendMsg() {
    const { ctx } = this;
    const { data } = ctx.request.body
    const AZURE_GPT_SERVER_ADDRESS = 'http://35.174.111.64:3002/api/v1/sendMsg'
    let msg = '如果我本月支出'
    for (let i = 0; i < data.length; i++) {
      msg = msg + "在" + data[i].typeName + "方面花" + data[i].typeTotal + "元,"
    }
    msg = msg + "你能分析一下我的支出情况并且给我一些人性化的财务管理建议吗?限制在50字左右。"
    // const template = `如果我本月支出在购物方面花10000元,
    // 在教育方面花费10251元,在餐饮方面花费8115元,你能分析一下我的支出情况并且给我一些人性化的财务管理建议吗?限制在50字左右。`
    const result = await ctx.curl(AZURE_GPT_SERVER_ADDRESS, {
      method: 'POST',
      data: {
        msg
      },
      timeout: 20000,
    })
    console.log(result.data)
    const bufferOriginal = Buffer.from(result.data)
    const bufferString = bufferOriginal.toString('utf8')
    ctx.success(bufferString)
  }
}

module.exports = CharGPTController;