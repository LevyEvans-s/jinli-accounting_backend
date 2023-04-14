module.exports = (app) => {
  const { router, controller } = app

  router.post('/receipt/bills_crop', controller.receipt.billsCrop) // 国内通用票据识别（单张）
  router.post('/receipt/bills_crop_batch', controller.receipt.billsCropBatch) // 国内通用票据识别 （多张）
  router.post('/receipt/crop_enhance_image', controller.receipt.cropEnhanceImage) // 图片切边增强
}