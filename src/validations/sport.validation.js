const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createSport = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.string().valid('single','duo','team').required(),
    limit: Joi.number().required(),
    classLimit: Joi.number().required(),
    imageUrl: Joi.string().required(),
    rules: Joi.array().required(),
  }),
};

const singleSport = {
  params: Joi.object().keys({
    sportId: Joi.string().custom(objectId),
  }),
};

const updateSport = {
  params: Joi.object().keys({
    sportId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        name: Joi.string(),
        type: Joi.string().valid('single','duo','team'),
        limit: Joi.number(),
        classLimit: Joi.number(),
        imageUrl: Joi.string(),
        rules: Joi.array(),
    })
};

module.exports = {
  createSport,
  singleSport,
  updateSport,
};
