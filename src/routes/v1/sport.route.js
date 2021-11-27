const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const sportValidation = require('../../validations/sport.validation');
const sportController = require('../../controllers/sport.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageSport'), validate(sportValidation.createSport), sportController.createSport)
  .get(auth(), sportController.getSports);

router
  .route('/:sportId')
  .get(auth(), validate(sportValidation.singleSport), sportController.getSport)
  .patch(auth('manageSport'), validate(sportValidation.updateSport), sportController.updateSport)
  .delete(auth('manageSport'), validate(sportValidation.singleSport), sportController.deleteSport);

module.exports = router;