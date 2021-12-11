const express = require('express');
const fixtureController = require('../../controllers/fixture.controller');

const router = express.Router();

router
  .route('/')
  .get(fixtureController.getFixtures);
router
  .route('/:sportName/:sportType')
  .get(fixtureController.getFixtureByName)

module.exports = router;