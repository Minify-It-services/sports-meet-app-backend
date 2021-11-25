const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTeam = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    year: Joi.string().required(),
    semester: Joi.string().required(),
    faculty: Joi.string().required(),
    coach: Joi.required().custom(objectId),
    manager: Joi.required().custom(objectId),
    captain: Joi.required().custom(objectId),
    memberIds: Joi.array().required(),
    sport: Joi.string().required(),
  }),
};

const singleTeam = {
  params: Joi.object().keys({
    teamId: Joi.string().custom(objectId),
  }),
};

const updateTeam = {
  params: Joi.object().keys({
    teamId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        name: Joi.string(),
        coach: Joi.custom(objectId),
        captain: Joi.custom(objectId),
        memberIds: Joi.array().required(),
    })
};

module.exports = {
  createTeam,
  singleTeam,
  updateTeam,
};
