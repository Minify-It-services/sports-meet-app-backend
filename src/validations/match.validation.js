const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMatch = {
  body: Joi.object().keys({
    date: Joi.date().required(),
    time: Joi.string().required(),
    team1: Joi.object().required(),
    team2: Joi.object().required(),
    sport: Joi.object().required(),
    cards: Joi.array(),
    scores: Joi.array(),
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
      time: Joi.string(),
      sport: Joi.object(),
      score: Joi.object().optional(),
      resultId: Joi.custom(objectId).optional(),
      team1: Joi.object().optional(),
      team2: Joi.object().optional(),
      score: Joi.object().optional(),
      scores: Joi.array().optional(),
      cards: Joi.array().optional(),
      status: Joi.string().valid('uncompleted', 'completed').optional(),
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
