const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTeam = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    year: Joi.string().required(),
    semester: Joi.string().required(),
    faculty: Joi.string().required(),
    coach: Joi.optional().custom(objectId),
    manager: Joi.optional().custom(objectId),
    captain: Joi.optional().custom(objectId),
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
        coach: Joi.custom(objectId).optional(),
        captain: Joi.custom(objectId).optional(),
        memberIds: Joi.array().required(),
    })
};

const teacherTeam = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    sport: Joi.string().required(),
    memberIds: Joi.array().required(),
  })
}

module.exports = {
  createTeam,
  singleTeam,
  updateTeam,
  teacherTeam,
};
