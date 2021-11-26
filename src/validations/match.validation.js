const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMatch = {
  body: Joi.object().keys({
    date: Joi.date().required(),
    team1: Joi.object().required(),
    team2: Joi.object().required(),
    sport: Joi.string().required(),
  }),
};

const getMatch = {
  params: Joi.object().keys({
    matchId: Joi.string().custom(objectId),
  }),
};

const updateMatch = {
  params: Joi.object().keys({
    matchId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      date: Joi.date(),
      sport: Joi.string(),
      score: Joi.object().optional(),
      resultId: Joi.custom(objectId).optional(),
      team1: Joi.object().optional(),
      team2: Joi.object().optional(),
      status: Joi.string().optional().valid('done', 'upcomming', 'today')
    })
    .min(1),
};

const deleteMatch = {
  params: Joi.object().keys({
    matchId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createMatch,
  getMatch,
  updateMatch,
  deleteMatch,
};
