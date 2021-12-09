const httpStatus = require('http-status');
const { Sport } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Sport
 * @param {Object} sportBody
 * @returns {Promise<Sport>}
 */
const createSport = async (sportBody) => {
  if (await Sport.isSportCreated(sportBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, `${sportBody.name} is already created.`);
  }
  return Sport.create(sportBody);
};

/**
 * Query for Sports
 * @returns {Promise<QueryResult>}
 */
const getSports = async (gender) => {
  const sports = await Sport.find({forGender:{$in: gender}});
  return sports;
};

/**
 * Get Sport by id
 * @param {ObjectId} id
 * @returns {Promise<Sport>}
 */
const getSportById = async (id) => {
  return Sport.findById(id);
};

const getSportByName = async (name) => {
  return Sport.findOne({ name });
}

/**
 * Update Sport by id
 * @param {ObjectId} SportId
 * @param {Object} updateBody
 * @returns {Promise<Sport>}
 */
const updateSportById = async (sportId, updateBody) => {
  const sport = await getSportById(sportId);
  if (!sport) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sport not found');
  }
  if (updateBody.name && (await Sport.isSportCreated(updateBody.name, sportId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, `${updateBody.name} is already Taken`);
  }
  Object.assign(sport, updateBody);
  await sport.save();
  return sport;
};

/**
 * Delete Sport by id
 * @param {ObjectId} SportId
 * @returns {Promise<Sport>}
 */
const deleteSportById = async (sportId) => {
  const sport = await getSportById(sportId);
  if (!sport) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sport not found');
  }
  await sport.remove();
  return sport;
};

module.exports = {
  createSport,
  getSports,
  getSportById,
  getSportByName,
  updateSportById,
  deleteSportById,
};
