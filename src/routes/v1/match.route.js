const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const matchValidation = require('../../validations/match.validation');
const matchController = require('../../controllers/match.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageMatch'), validate(matchValidation.createMatch), matchController.createMatch)
  .get( matchController.getMatches);
router
  .route('/:matchId')
  .get(validate(matchValidation.getMatch), matchController.getMatch)
  .patch(auth('manageMatch'), validate(matchValidation.updateMatch), matchController.updateMatch)
  .delete(auth('manageMatch'), validate(matchValidation.deleteMatch), matchController.deleteMatch);

module.exports = router;