const express = require('express');
const tieSheetController = require('../../controllers/tieSheet.controller');

const router = express.Router();

router
  .route('/')
  .post(tieSheetController.addTieSheet)
  .get(tieSheetController.getTieSheets);
router
  .route('/league')
  .get(tieSheetController.getLeagues);

module.exports = router;