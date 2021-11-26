const express = require('express');
const auth = require('../../middlewares/auth');
const adminController = require('../../controllers/admin.controller');

const router = express.Router();

router
  .route('/dashboard')
  .get(auth('manageUsers'), adminController.getDashboard)

module.exports = router;