const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const teamSchema = mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: String,
        required: true,
        trim: true,
    },
    semester: {
        type: String,
        required: true,
        trim: true,
    },
    faculty: {
        type: String,
        required: true,
        trim: true,
    },
    imageUrl: {
        type: String,
        trim: true,
    },
    sport: {
        type: String,
        required: true,
    },
    coach: {
        type: {
            id: {
                type: mongoose.SchemaTypes.ObjectId,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            contactNumber: {
                type: String,
                required: true,
            },
        },
    },
    manager: {
        type: {
            id: {
                type: mongoose.SchemaTypes.ObjectId,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            contactNumber: {
                type: String,
                required: true,
            },
        },
    },
    captain: {
        type: {
            id: {
                type: mongoose.SchemaTypes.ObjectId,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            contactNumber: {
                type: String,
                required: true,
            },
        },
    },
    memberIds: {
        type: [mongoose.SchemaTypes.ObjectId],
        required: true,
    },
    games: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: [],
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
teamSchema.plugin(toJSON);
teamSchema.plugin(paginate);

// teamSchema.statics.isteamCreated = async function(name, excludeTeamId){
//     const team = await this.findOne({name, _id: {$ne: excludeTeamId}})
//     return !!team
// }

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
