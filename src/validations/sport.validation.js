const Joi = require('joi');
const { objectId, userObject } = require('./custom.validation');

const createSport = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.string().valid('single','duo','team').required(),
    limit: Joi.number().required(),
    classLimit: Joi.number().required(),
    playerLimit: Joi.number().required(),
    extraLimit: Joi.number().required(),
    imageUrl: Joi.string().required(),
    rules: Joi.array().required(),
    coordinators: Joi.array().required(),
    referees: Joi.array().required(), 
  }),
};

const singleSport = {
  params: Joi.object().keys({
    sportId: Joi.string().custom(objectId),
    sportName: Joi.string(),
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
        bgImageUrl: Joi.string(),
        rules: Joi.array(),
        playerLimit: Joi.number(),
        extraLimit: Joi.number(),
        coordinators: Joi.array(),
        referees: Joi.array(),
    })
};

module.exports = {
  createSport,
  singleSport,
  updateSport,
};
