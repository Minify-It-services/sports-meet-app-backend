const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const moment = require('moment');
const catchAsync = require('../utils/catchAsync');
const { noticeService } = require('../services');
const { Notice } = require('../models');
const { jsend } = require('../utils/jsend');

const today = moment().startOf('day');

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

const getTodayNotices = catchAsync(async (req, res) => {
  const notices = await Notice.find({ createdAt: {
    $gte: today.toDate(),
    $lte: moment(today).endOf('day').toDate(),
  } })
  res.status(httpStatus.OK).send(jsend(notices));
})

module.exports = {
  createNotice,
  getNotices,
  updateNotice,
  deleteNotice,
  getTodayNotices,
};
