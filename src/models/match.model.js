const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const matchSchema = mongoose.Schema(
  {
    date: {
        type: Date,
        required: true,
        trim: true,
    },
    team1: {
        type: {
            team1Id: {
                type: mongoose.SchemaTypes.ObjectId,
                required: true,
            },
            team1Name: {
                type: String,
                required: true,
                trim: true,
            },
        }
     },
     team2: {
        type: {
            team2Id: {
                type: mongoose.SchemaTypes.ObjectId,
                required: true,
            },
            team2Name: {
                type: String,
                required: true,
                trim: true,
            },
        }
     },
     score: {
        type: {
            team1Score: {
                type: Number,
                default: 0,
            },
            team2Score: {
                type: Number,
                default: 0,
            },
        }
     },
     sport: {
         type: String,
     },
     resultId: {
        type: mongoose.SchemaTypes.ObjectId,
        default: null,
     }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
matchSchema.plugin(toJSON);
matchSchema.plugin(paginate);

matchSchema.statics.isSportCreated = async function(name, excludeMatchId){
    const match = await this.findOne({name, _id: {$ne: excludeMatchId}})
    return !!match
}

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
