const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { User, Team, Sport } = require('../models');
const { teamService } = require('../services');
const { jsend } = require('../utils/jsend');
const findGameMembers = require('../utils/findGameMembers');
const logger = require('../config/logger')

const getUser = async (id) => {
    return User.findById(id);
}
const addMembers = async (team) => {
    if(team.manager){
      const manager = await getUser(team.manager.id);
      await manager.updateAddTeams(team._id, team.name, team.sport, 'manager')
      await manager.save()
    }
    if(team.coach){
      const coach = await getUser(team.coach.id);
      await coach.updateAddTeams(team._id, team.name, team.sport, 'coach')
      await coach.save()
    }
    if(team.captain){
      const captain = await getUser(team.captain.id);
      await captain.updateAddTeams(team._id, team.name, team.sport, 'captain')
      await captain.save()
    }

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
  res.status(httpStatus.NO_CONTENT).send(jsend({ message: 'deleted' }));
});

const checkTeam = catchAsync(async (req, res) => {
  const { sport, year, faculty, playerId } = req.query
  const teams = await Team.find({ sport, year, faculty })
  const game = await Sport.findOne({ name: sport })

  const { inGame, teamMembers, teamId } = await findGameMembers(teams, game, playerId, true)
  
  if(inGame > 0){
    res.send(jsend({ message: 'Already in a team', teamId, teamMembers }))
    return
  }
  if(game.classLimit!==-1 && teams.length >= game.classLimit){
    res.send(jsend({ message: 'Team full' }))
    return
  }

  res.send(jsend({ message: 'Not in team and team empty' }))
})

const createTeacherTeam = catchAsync(async (req, res) =>{
  const {name, sport, memberIds } = req.body
  const team = {
    name,
    memberIds,
    sport,
    year: '0',
    semester: '0th',
    faculty: 'staff',
  }
  const createdTeam = await Team.create(team)
  res.status(httpStatus.CREATED).send(jsend(createdTeam))
})

module.exports = {
  createTeam,
  getTeams,
  getTeam,
  updateTeam,
  deleteTeam,
  checkTeam,
  createTeacherTeam,
};
