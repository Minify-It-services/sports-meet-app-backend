const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { sportService } = require('../services');
const { jsend } = require('../utils/jsend')

const createSport = catchAsync(async (req, res) => {
  const sport = await sportService.createSport(req.body);
  res.status(httpStatus.CREATED).send(jsend(sport));
});

const getSports = catchAsync(async (req, res) => {
  const result = await sportService.getSports();
  res.send(result);
});

const getSport = catchAsync(async (req, res) => {
  const sport = await sportService.getSportById(req.params.sportId);
  if (!sport) {
    throw new ApiError(httpStatus.NOT_FOUND, 'sport not found');
  }
  res.send(jsend(sport));
});

const updateSport = catchAsync(async (req, res) => {
  const sport = await sportService.updateSportById(req.params.sportId, req.body);
  res.send(jsend(sport));
});

const deleteSport = catchAsync(async (req, res) => {
  await sportService.deleteSportById(req.params.sportId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createSport,
  getSports,
  getSport,
  updateSport,
  deleteSport,
};
