const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const teamValidation = require('../../validations/team.validation');
const teamController = require('../../controllers/team.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(teamValidation.createTeam), teamController.createTeam)
  .get(auth(), teamController.getTeams);

router
  .route('/check')
  .get(auth(), teamController.checkTeam)

router
  .route('/leave/:teamId')
  .delete(auth('leaveTeam'), validate(teamValidation.singleTeam), teamController.deleteTeam)
  .patch(auth('leaveTeam'), teamController.updateTeam)

router
  .route('/:teamId')
  .get(auth(), validate(teamValidation.singleTeam), teamController.getTeam)
  .patch(auth('manageTeam'), validate(teamValidation.updateTeam), teamController.updateTeam)
  .delete(auth('removeTeam'), validate(teamValidation.singleTeam), teamController.deleteTeam);

module.exports = router;