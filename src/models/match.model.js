const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const matchSchema = mongoose.Schema(
  {
    date: {
        type: Date,
        required: true,
        trim: true,
    },
    time: {
        type: String,
        required: true,
        trim: true,
    },
    team1: {
        type: {
            id: {
                type: mongoose.SchemaTypes.ObjectId,
                required: true,
            },
            name: {
                type: String,
                required: true,
                trim: true,
            },
        }
     },
     team2: {
        type: {
            id: {
                type: mongoose.SchemaTypes.ObjectId,
                required: true,
            },
            name: {
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
            },
            team2Score: {
                type: Number,
            },
        },
        default: {
            team1Score: 0,
            team2Score: 0,
        },
     },
     sport: {
         type: {
             name: String,
             gameType: {
                 type: String,
                 enum: ['single', 'duo', 'team'],
             },
         },
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
