const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { sportService } = require('../services');
const { jsend } = require('../utils/jsend')

const createSport = catchAsync(async (req, res) => {
  console.log(req.body)
  const sport = await sportService.createSport(req.body);
  res.status(httpStatus.CREATED).send(jsend(sport));
});

const getSports = catchAsync(async (req, res) => {
  const {gender} = req.query
  let genderArray = ['male','female','both']
  if(gender!==undefined){
    genderArray = [gender,'both']
  }
  const result = await sportService.getSports(genderArray);
  res.send(jsend(result));
});

const getSport = catchAsync(async (req, res) => {
  const { sportId, sportName } = req.params;

  let sport = null;

  if(sportId)
    sport = await sportService.getSportById(sportId);
  if(sportName)
    sport = await sportService.getSportByName(sportName)

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
  res.send(jsend({ message: 'Sport Deleted' }));
});

module.exports = {
  createSport,
  getSports,
  getSport,
  updateSport,
  deleteSport,
};
