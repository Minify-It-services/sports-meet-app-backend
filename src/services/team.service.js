const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { Team, User } = require('../models');
const ApiError = require('../utils/ApiError');
const logger = require('../config/logger')

const getUser = async (id) => {
    return User.findById(id);
}
/**
 * Create a team
 * @param {Object} teamBody
 * @returns {Promise<team>}
 */
const createTeam = async (teamBody) => {
    let teamBodyToCreate = {
      ...teamBody
    }

    if(teamBody.coach){
      const Coach = await getUser(teamBody.coach)
      teamBodyToCreate = {
        ...teamBodyToCreate,
        coach: await Coach.getMinimumDetail(),
      }
    }
    if(teamBody.manager){
      const Manager = await getUser(teamBody.manager)
      teamBodyToCreate = {
        ...teamBodyToCreate,
        manager: await Manager.getMinimumDetail(),
      }
    }
    if(teamBody.captain){
      const Captain = await getUser(teamBody.captain)
      teamBodyToCreate = {
        ...teamBodyToCreate,
        captain: await Captain.getMinimumDetail(),
      }
    }

    return Team.create(teamBodyToCreate)
};

/**
 * Query for teams
 * @returns {Promise<QueryResult>}
 */
const getTeams = async () => {
  const teams = await Team.find({});
  return teams;
};

/**
 * Get team by id
 * @param {ObjectId} id
 * @returns {Promise<team>}
 */
const getTeamById = async (id) => {
  return Team.findById(id);
};

const updatePlayers = async (team, newTeam) => {
  const oldTeamMembers = team.memberIds.map(mId => mId.toString()).toObject();
  const newTeamMembers = newTeam.memberIds.map(mId => mId.toString());

  const commonMembers = oldTeamMembers.filter(memberId => newTeamMembers.indexOf(memberId)!=-1)
  const idsToRemove = oldTeamMembers.filter(memberId => commonMembers.indexOf(memberId)===-1)
  const idsToAdd = newTeamMembers.filter(memberId => commonMembers.indexOf(memberId)===-1)

  for(let i = 0; i < idsToRemove.length; i++){
      const oldMember = await getUser(mongoose.Types.ObjectId(idsToRemove[i]));
      await oldMember.updateRemoveTeams(team._id)
      await oldMember.save()
  }
  
  for(let i = 0; i < idsToAdd.length; i++){
    const newMember = await getUser(mongoose.Types.ObjectId(idsToAdd[i]));
    await newMember.updateAddTeams(team._id, team.name, team.sport.name, team.sport.gameType, 'player')
    await newMember.save()
  }
}

/**
 * Update team by id
 * @param {ObjectId} teamId
 * @param {Object} updateBody
 * @returns {Promise<team>}
 */
const updateTeamById = async (teamId, updateBody) => {
  const team = await getTeamById(teamId);
  if (!team) {
    throw new ApiError(httpStatus.NOT_FOUND, 'team not found');
  }

  if(updateBody.captain){
    const Captain = await getUser(updateBody.captain)
    updateBody.captain = await Captain.getMinimumDetail()
    await Captain.updateAddTeams(team._id, team.name, team.sport.name, team.sport.gameType, 'captain')
    await Captain.save()
  }
  if(updateBody.coach ){
    const Coach = await getUser(updateBody.coach)
    updateBody.coach = await Coach.getMinimumDetail()
    await Coach.updateAddTeams(team._id, team.name, team.sport.name, team.sport.gameType, 'coach')
    await Coach.save()
  }

  const OldCaptain = await getUser(team.captain.id)
  await OldCaptain.updateRemoveTeams(team._id)
  await OldCaptain.save()

  const OldCoach = await getUser(team.coach.id)
  await OldCoach.updateRemoveTeams(team._id)
  await OldCoach.save()

  await updatePlayers(team, updateBody)
  Object.assign(team, updateBody);
  await team.save();
  return team;
};

const removeMembers = async (team) => {
    if(team.manager){
      const manager = await getUser(team.manager.id)
      await manager.updateRemoveTeams(team._id)
      await manager.save()
    }
    if(team.coach){
      const coach = await getUser(team.coach.id)
      await coach.updateRemoveTeams(team._id)
      await coach.save()
    }
    if(team.captain){
      const captain = await getUser(team.captain.id)
      await captain.updateRemoveTeams(team._id)
      await captain.save()
    }
    for(let i=0; i<team.memberIds.length; i++){
      const player = await getUser(team.memberIds[i])
      await player.updateRemoveTeams(team._id)
      await player.save()
    }
}

/**
 * Delete team by id
 * @param {ObjectId} teamId
 * @returns {Promise<team>}
 */
const deleteTeamById = async (teamId) => {
  const team = await getTeamById(teamId);
  if (!team) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Team not found');
  }
  await removeMembers(team)
  await team.remove();
  return team;
};

module.exports = {
  createTeam,
  getTeams,
  getTeamById,
  updateTeamById,
  deleteTeamById,
};
