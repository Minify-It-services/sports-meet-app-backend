const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const { jsend } = require('../utils/jsend');
const { Sport, Team } = require('../models');
const findGameMembers = require('../utils/findGameMembers');
const logger = require('../config/logger')

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(jsend(user));
});

const getUsers = catchAsync(async (req, res) => {
  const {year, userId, sport, faculty} = req.query;
  const options = pick(req.query, ['sortBy']);

  const teams = await Team.find({ sport, year, faculty })
  const game = await Sport.findOne({ name: sport })

  const { inGame, teamMembers } = await findGameMembers(teams, game, userId);

  const excludeUserId = [userId];
  if(inGame) {
    teamMembers.forEach(teamMember=>excludeUserId.push(teamMember))
  }

  const result = await userService.queryUsers(year, excludeUserId);
  res.send(jsend(result));
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(jsend(user));
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(jsend(user));
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
