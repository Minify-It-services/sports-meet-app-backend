const express = require('express');
// const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const noticeValidation = require('../../validations/notice.validation');
const noticeController = require('../../controllers/notice.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(noticeValidation.createNotice), noticeController.createNotice)
  .get(noticeController.getNotices)

router
  .route('/:noticeId')
  .patch(validate(noticeValidation.updateNotice), noticeController.updateNotice)
  .delete(validate(noticeValidation.deleteNotice), noticeController.deleteNotice);

module.exports = router;