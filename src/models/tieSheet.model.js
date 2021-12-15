const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const tieSheetSchema = mongoose.Schema(
  {
    name: String,
    badmintonBoys: {
        type: {
            name: String,
            imageUrl: String,
        },
    },
    badmintonGirls: {
        type: {
            name: String,
            imageUrl: String,
        },
    },
    badmintonBoysDouble: {
        type: {
            name: String,
            imageUrl: String,
        },
    },
    badmintonGirlsDouble: {
        type: {
            name: String,
            imageUrl: String,
        },
    },
    tableTennisBoys: {
        type: {
            name: String,
            imageUrl: String,
        },
    },
    tableTennisGirls: {
        type: {
            name: String,
            imageUrl: String,
        },
    },
    tableTennisBoysDouble: {
        type: {
            name: String,
            imageUrl: String,
        },
    },
    tableTennisGirlsDouble: {
        type: {
            name: String,
            imageUrl: String,
        },
    },
    chess : {
        type: {
            name: String,
            imageUrl: String,
        },
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
tieSheetSchema.plugin(toJSON);
tieSheetSchema.plugin(paginate);


const TieSheet = mongoose.model('TieSheet', tieSheetSchema);

module.exports = TieSheet;
