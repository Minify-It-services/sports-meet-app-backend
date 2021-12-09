const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createNotice = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    label: Joi.string().valid('delayed', 'default winner', 'moved ahead', 'cancelled', 'important').required(),
  }),
};

const updateNotice = {
  params: Joi.object().keys({
    noticeId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        label: Joi.string().valid('delayed', 'default winner', 'moved ahead', 'cancelled', 'important').required(),
    })
};

const deleteNotice = {
  params: Joi.object().keys({
    noticeId: Joi.required().custom(objectId),
  }),
}

module.exports = {
  createNotice,
  updateNotice,
  deleteNotice,
};
