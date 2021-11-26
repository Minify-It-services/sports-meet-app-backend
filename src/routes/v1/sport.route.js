const express = require('express');
// const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const sportValidation = require('../../validations/sport.validation');
const sportController = require('../../controllers/sport.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(sportValidation.createSport), sportController.createSport)
  .get(sportController.getSports);

router
  .route('/:sportId')
  .get(validate(sportValidation.singleSport), sportController.getSport)
  .patch(validate(sportValidation.updateSport), sportController.updateSport)
  .delete(validate(sportValidation.singleSport), sportController.deleteSport);

module.exports = router;