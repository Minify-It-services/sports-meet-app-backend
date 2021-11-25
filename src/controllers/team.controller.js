const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { User } = require('../models');
const { teamService } = require('../services');
const { jsend } = require('../utils/jsend');

const getUser = async (id) => {
    return User.findById(id);
}
const addMembers = async (team) => {
    const manager = await getUser(team.manager.id);
    await manager.updateAddTeams(team._id, team.name, team.sport, 'manager')
    await manager.save()

    const coach = await getUser(team.coach.id);
    await coach.updateAddTeams(team._id, team.name, team.sport, 'coach')
    await coach.save()

    const captain = await getUser(team.captain.id);
    await captain.updateAddTeams(team._id, team.name, team.sport, 'captain')
    await captain.save()

    await team.memberIds.forEach(async (memberId) => {
        const player = await getUser(memberId);
        await player.updateAddTeams(team._id, team.name, team.sport, 'player')
        await player.save()
    })
}

const createTeam = catchAsync(async (req, res) => {
  const team = await teamService.createTeam(req.body);
  await addMembers(team)
  res.status(httpStatus.CREATED).send(jsend(team));
});

const getTeams = catchAsync(async (req, res) => {
  const result = await teamService.getTeams();
  res.send(jsend(result));
});

const getTeam = catchAsync(async (req, res) => {
  const team = await teamService.getTeamById(req.params.teamId);
  if (!team) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Team not found');
  }
  res.send(jsend(team));
});

const updateTeam = catchAsync(async (req, res) => {
  const team = await teamService.updateTeamById(req.params.teamId, req.body);
  res.send(jsend(team));
});

const deleteTeam = catchAsync(async (req, res) => {
  await teamService.deleteTeamById(req.params.teamId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTeam,
  getTeams,
  getTeam,
  updateTeam,
  deleteTeam,
};
