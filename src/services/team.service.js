const httpStatus = require('http-status');
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
  for(let i = 0; i < team.memberIds.length; i++){
    if(!newTeam.memberIds.includes(team.memberIds[i])){
      const oldMember = await getUser(team.memberIds[i])
      await oldMember.updateRemoveTeams(team._id)
      await oldMember.save()
    }
  }
  
  for(let i = 0; i < newTeam.memberIds.length; i++){
    if(!team.memberIds.includes(newTeam.memberIds[i])){
      const newMember = await getUser(newTeam.memberIds[i])
      await newMember.updateAddTeams(team._id, team.name, team.sport, 'player')
      await newMember.save()
    }
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

if(updateBody.captain ){
  const Captain = await getUser(updateBody.captain)
  updateBody.captain = await Captain.getMinimumDetail()
  await Captain.updateAddTeams(team._id, team.name, team.sport, 'captain')
  await Captain.save()
  const OldCaptain = await getUser(team.captain.id)
  await OldCaptain.updateRemoveTeams(team._id)
    await OldCaptain.save()
  }
  if(updateBody.coach ){
    const Coach = await getUser(updateBody.coach)
    updateBody.coach = await Coach.getMinimumDetail()
    await Coach.updateAddTeams(team._id, team.name, team.sport, 'coach')
    await Coach.save()
    const OldCoach = await getUser(team.coach.id)
    await OldCoach.updateRemoveTeams(team._id)
    await OldCoach.save()
  }
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

    await team.memberIds.forEach(async memberId => {
        const player = await getUser(memberId)
        await player.updateRemoveTeams(team._id)
        await player.save()
    })
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
