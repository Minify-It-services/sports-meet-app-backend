const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { noticeService } = require('../services');
const { jsend } = require('../utils/jsend');

const createNotice = catchAsync(async (req, res) => {
  const notice = await noticeService.createNotice(req.body);
  res.status(httpStatus.CREATED).send(jsend(notice));
});

const getNotices = catchAsync(async (req, res) => {
  const result = await noticeService.getNotices();
  res.send(jsend(result));
});

const updateNotice = catchAsync(async (req, res) => {
  const notice = await noticeService.updateNoticeById(req.params.noticeId, req.body);
  res.send(jsend(notice));
});

const deleteNotice = catchAsync(async (req, res) => {
  await noticeService.deleteNoticeById(req.params.noticeId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createNotice,
  getNotices,
  updateNotice,
  deleteNotice,
};
