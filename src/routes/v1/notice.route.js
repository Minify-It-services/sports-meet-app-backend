const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const noticeValidation = require('../../validations/notice.validation');
const noticeController = require('../../controllers/notice.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageNotice'), validate(noticeValidation.createNotice), noticeController.createNotice)
  .get(noticeController.getNotices)
router
  .route('/today')
  .get(noticeController.getTodayNotices)
router
  .route('/:noticeId')
  .patch(auth('manageNotice'), validate(noticeValidation.updateNotice), noticeController.updateNotice)
  .delete(auth('manageNotice'), validate(noticeValidation.deleteNotice), noticeController.deleteNotice);

module.exports = router;