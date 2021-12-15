const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { jsend } = require('../utils/jsend');
const { TieSheet } = require('../models');

const addTieSheet = catchAsync(async (req, res) => {
    const ts = await TieSheet.create(req.body)

    res.status(httpStatus.CREATED).send(jsend(ts))
})

const getTieSheets = catchAsync(async (req, res) => {

    const ts = await TieSheet.find({ name: 'only tiesheet' })

    res.status(httpStatus.OK).send(jsend(ts))
})

module.exports = {
    getTieSheets,
    addTieSheet,
};
