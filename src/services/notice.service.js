const httpStatus = require('http-status');
const { Notice } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Notice
 * @param {Object} sportBody
 * @returns {Promise<Sport>}
 */
const createNotice = async (noticeBody) => {
  return Notice.create(noticeBody);
};

/**
 * Query for Notices
 * @returns {Promise<QueryResult>}
 */
const getNotices = async () => {
  const notice = await Notice.find({});
  return notice;
};

const getNoticeById = async (id) => {
  return Notice.findById(id);
};

/**
 * Update Notice by id
 * @param {ObjectId} SportId
 * @param {Object} updateBody
 * @returns {Promise<Sport>}
 */
const updateNoticeById = async (noticeId, updateBody) => {
  const notice = await getNoticeById(noticeId);
  if (!notice) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Notice not found');
  }
  
  Object.assign(notice, updateBody);
  await notice.save();
  return notice;
};

/**
 * Delete Notice by id
 * @param {ObjectId} NoticeId
 * @returns {Promise<Sport>}
 */
const deleteNoticeById = async (noticeId) => {
  const notice = await getNoticeById(noticeId);
  if (!notice) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Notice not found');
  }
  await notice.remove();
  return notice;
};

module.exports = {
  createNotice,
  getNotices,
  updateNoticeById,
  deleteNoticeById,
};
