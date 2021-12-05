const httpStatus = require('http-status');
const { Match } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Match
 * @param {Object} matchBody
 * @returns {Promise<Match>}
 */
const createMatch = async (matchBody) => {
  return Match.create(matchBody);
};

/**
 * Query for Matches
 * @returns {Promise<QueryResult>}
 */
const getMatches = async () => {
  const matches = await Match.find({});
  return matches;
};

/**
 * Get Match by id
 * @param {ObjectId} id
 * @returns {Promise<Match>}
 */
const getMatchById = async (id) => {
  return Match.findById(id);
};

/**
 * Update Match by id
 * @param {ObjectId} MatchId
 * @param {Object} updateBody
 * @returns {Promise<Match>}
 */
const updateMatchById = async (matchId, updateBody) => {
  const match = await getMatchById(matchId);
  if (!match) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Match not found');
  }
  Object.assign(match, updateBody);
  await match.save();
  return match;
};

/**
 * Delete Match by id
 * @param {ObjectId} MatchId
 * @returns {Promise<Match>}
 */
const deleteMatchById = async (matchId) => {
  const match = await getMatchById(matchId);
  if (!match) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Match not found');
  }
  await match.remove();
  return match;
};

const getMatchesForToday = async () => {
  const matches = await Match.find({ date: { $lt: new Date() } });
  return matches
}

const getMatchesBySport = async (sport) => {
  const matches = await Match.find({ sport });
  return matches
}

module.exports = {
  createMatch,
  getMatches,
  getMatchById,
  updateMatchById,
  deleteMatchById,
  getMatchesForToday,
  getMatchesBySport,
};
