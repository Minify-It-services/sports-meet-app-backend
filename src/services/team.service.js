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
//   if (await Team.isteamCreated(teamBody.name)) {
//     throw new ApiError(httpStatus.BAD_REQUEST, `${teamBody.name} is already created.`);
//   }
    const { coach, manager, captain } = teamBody
    const Coach = await getUser(coach)
    const Manager = await getUser(manager)
    const Captain = await getUser(captain)

    const teamBodyToCreate = {
        ...teamBody,
        coach: await Coach.getMinimumDetail(),
        manager: await Manager.getMinimumDetail(),
        captain: await Captain.getMinimumDetail(),
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
//   if (updateBody.name && (await team.isteamCreated(updateBody.name, teamId))) {
//     throw new ApiError(httpStatus.BAD_REQUEST, `${updateBody.name} is already Taken`);
//   }
  if(updateBody.captain){
    const Captain = await getUser(updateBody.captain)
    updateBody.captain = await Captain.getMinimumDetail()
    const OldCaptain = await getUser(team.captain.id)
    await OldCaptain.updateRemoveTeams(team._id)
    await OldCaptain.save()
  }
  if(updateBody.coach){
    const Coach = await getUser(updateBody.coach)
    updateBody.coach = await Coach.getMinimumDetail()
    const OldCoach = await getUser(team.coach.id)
    await OldCoach.updateRemoveTeams(team._id)
    await OldCoach.save()
  }
  Object.assign(team, updateBody);
  await team.save();
  return team;
};

const removeMembers = async (team) => {
    // logger.info('removing members')
    const manager = await getUser(team.manager.id)
    // logger.info(manager)
    await manager.updateRemoveTeams(team._id)
    logger.info(manager)
    await manager.save()

    const coach = await getUser(team.coach.id)
    await coach.updateRemoveTeams(team._id)
    await coach.save()

    const captain = await getUser(team.captain.id)
    await captain.updateRemoveTeams(team._id)
    await captain.save()

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
//   await team.remove();
  return team;
};

module.exports = {
  createTeam,
  getTeams,
  getTeamById,
  updateTeamById,
  deleteTeamById,
};
