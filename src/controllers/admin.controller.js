const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { User, Sport, Team } = require('../models')
const { jsend } = require('../utils/jsend')
const logger = require('../config/logger')

const getDashboard = catchAsync(async (req, res) => {
  const totalUsers = await User.countDocuments({}, function (err, count) { return count })
  const totalSports = await Sport.countDocuments({}, function (err, count) { return count })
  const totalTeams = await Team.countDocuments({}, function (err, count) { return count })

  res.status(httpStatus.CREATED).send(jsend({ 
      totalUsers,
      totalSports,
      totalTeams,
  }));
});

module.exports = {
    getDashboard,
};
