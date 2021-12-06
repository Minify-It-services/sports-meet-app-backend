const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const { jsend } = require('../utils/jsend');
const { Sport, Team } = require('../models');
const { findGameMembers, findGameMembersTeam } = require('../utils/findGameMembers');
const logger = require('../config/logger')

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(jsend(user));
});

const getUsers = catchAsync(async (req, res) => {
  const {year, userId, sport, sportType, faculty, gender} = req.query;
  const options = pick(req.query, ['sortBy']);

  const teams = await Team.find({ sport: { name: sport, gameType: sportType }, year, faculty })
  const game = await Sport.findOne({ name: sport })

  const excludeUserId = [];
  let members = {}
  if(game){
    if(game.type!=='team')
      members = await findGameMembers(teams, game, userId);
    else
      members = await findGameMembersTeam(teams, userId)

    const { inGame, teamMembers, role } = members

    if(game.type === 'duo'){
      excludeUserId.push(userId)
    }
    if(inGame && (role || game.type === 'duo') && role !== 'manager') {
      teamMembers.forEach(teamMember=>excludeUserId.push(teamMember))
    }
  }
  let genderArr = ['male', 'female']
  if(gender)
    genderArr = [gender]

  const result = await userService.queryUsers(year, genderArr, excludeUserId);
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
