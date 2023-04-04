const Service = require('egg').Service;
const { BILL_TYPE_KEY_MAP } = require('../utils/BillCategory')

class ReceiptService extends Service {
  billsCropParseData(objList) {
    let resData = []
    objList.forEach(obj => {
      const type = obj.type ? obj.type : ''
      const type_description = obj.type_description ? obj.type_description : ''
      const kind = obj.kind ? obj.kind : ''
      const kind_description = obj.kind_description ? obj.kind_description : ''
      const item_list = obj.item_list ? obj.item_list : null
      if (item_list && item_list.length > 0) {
        for (let item of item_list) {
          if (item.key === BILL_TYPE_KEY_MAP[type]) {
            resData.push({ type, type_description, kind, kind_description, value: item.value })
            break
          }
        }
      } else {
        resData.push({ type, type_description, kind, kind_description, value: '' })
      }
    })
    return resData
  }

  cropImageParseBase64(imageList) {
    imageList.forEach(item => {
      item.image = 'data:image/jpeg;base64,'.concat(item.image)
    })
    return imageList
  }
}

module.exports = ReceiptService;