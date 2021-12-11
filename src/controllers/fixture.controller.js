const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { jsend } = require('../utils/jsend');
const { Match, Sport } = require('../models');
const moment = require('moment');

const today = moment().startOf('day');

const getFixtures = catchAsync(async (req, res) => {
    const sports = await Sport.find({})
    const matches = [];
    
    for(let i = 0; i < sports.length; i++){
      const match = await Match.find({ sport: { name: sports[i].name, gameType: sports[i].type } }) 
      matches.push(match)
    }

    res.status(httpStatus.OK).send(jsend(matches))
})

const getFixtureByName = catchAsync(async (req, res) => {
  const { sportName, sportType } = req.params
  const sportData = {
    name: sportName,
    gameType: sportType,
  }
  const currentSport = await Sport.find({ name: sportName })
  const todaysMatches = await Match.find({ sport: sportData, date: {
    $gte: today.toDate(),
    $lte: moment(today).endOf('day').toDate(),
  } })
  const upcomingMatches = await Match.find({ $query: { sport: sportData, status: 'uncompleted' }, $orderby: { date: 1 } })
  const completedMatches = await Match.find({ $query: { sport: sportData, status: 'completed' }, $orderby: { date: 1 } })

  res.status(httpStatus.OK).send(jsend({
    sport: currentSport,
    todaysMatches,
    upcomingMatches,
    completedMatches,
  }))
})

module.exports = {
    getFixtures,
    getFixtureByName,
};
