const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
// const matchValidation = require('../../validations/match.validation');
// const matchController = require('../../controllers/match.controller');

const router = express.Router();

// router
//   .route('/')
//   .get(auth('getMatches'), validate(matchValidation.getMatches), matchController.getMatches);

// router
//   .route('/:matchId')
//   .get(auth(['getMatches', 'getMatch']), validate(matchValidation.getMatch), userController.getMatch)
//   .patch(auth('manageMatch'), validate(matchValidation.updateMatch), matchController.updateMatch)
//   .delete(auth('manageMatches'), validate(matchValidation.deleteMatch), matchController.deleteMatch);

module.exports = router;