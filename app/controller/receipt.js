const Controller = require('egg').Controller;
const TextinUrlManager = require('../utils/TextinUrl')
const path = require('path')
const fs = require('fs')
const sendToWormhole = require('stream-wormhole')

class ReceiptController extends Controller {
  // 国内通用票据识别 - 支持单张图片
  async billsCrop() {
    const { ctx } = this
    const stream = await ctx.getFileStream();
    const name = 'jinli_img_bk/' + path.basename(stream.filename);
    const res = await ctx.helper.curlToTextin(TextinUrlManager.BILLS_CROP_URL, {
      stream: stream,
      method: 'POST',
      dataType: 'json'
    })
    if (res) {
      const objList = res.data.result.object_list
      const result = ctx.service.receipt.billsCropParseData(objList)
      return ctx.success(result)
    }
    ctx.throw(422, '信息提取失败')
  }

  // 国内通用票据识别 - 支持多张图片
  async billsCropBatch() {
    const { ctx } = this
    const files = ctx.request.files;
    const promiseQueue = []
    for (let file of files) {
      promiseQueue.push(new Promise((resolve, reject) => {
        const res = ctx.helper.curlToTextin(TextinUrlManager.BILLS_CROP_URL, {
          data: fs.readFileSync(file.filepath),
          method: 'POST',
          dataType: 'json'
        })
        resolve(res)
      }))
    }
    return Promise.all(promiseQueue).then(rawData => {
      const res = []
      rawData.forEach(data => {
        res.push(ctx.service.receipt.billsCropParseData(data.data.result.object_list))
      })
      ctx.success(res)
    })
  }

  // 图片切边增强 - 支持单张图片
  async cropEnhanceImage() {
    const { ctx } = this
    const stream = await ctx.getFileStream();
    const name = 'jinli_img_bk/' + path.basename(stream.filename);
    const res = await ctx.helper.curlToTextin(TextinUrlManager.CROP_ENHANCE_IMAGE_URL, {

      stream: stream,
      method: 'POST',
      dataType: 'json'
    })
    if (res) {
      return ctx.success({
        ...res.data.result,
        duration: res.data.duration,
        image_list: ctx.service.receipt.cropImageParseBase64(res.data.result.image_list)
      },
        `处理成功，耗时${res.data.duration}毫秒`
      )
    }
    ctx.throw(422, '处理失败')
  }
}

module.exports = ReceiptController;