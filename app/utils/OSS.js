const OSS = require('ali-oss')
const AccessKeyID = 'LTAI5tP3JneEGw7zAfz9JwGd'
const AccessKeySecret = 'jZlZlIG1Q8Gzh8BlH6ekxvq2KRdblL'

class OSSManager {
  constructor() {
    this.client = new OSS({
      region: 'oss-cn-shanghai',
      accessKeyId: AccessKeyID,
      accessKeySecret: AccessKeySecret,
      bucket: 'jinli-accounting'
    })
  }

  // 列举当前账号所有地域下的存储空间。
  async listBuckets() {
    try {
      const result = await this.client.listBuckets();
      return result
    } catch (err) {
      curlToTextin.throw(err.status, err.message)
    }
  }
}

module.exports = OSSManager