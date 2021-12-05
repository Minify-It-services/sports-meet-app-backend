const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const sportSchema = mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    type: {
        type: String,
        enum: ['single', 'duo', 'team'],
        required: true,
     },
    limit: {
        type: Number,
        required: true,
    },
    classLimit: {
        type: Number,
        required: true,
    },
    playerLimit: {
      type: Number,
      required: true,
    },
    extraLimit: {
      type: Number,
      required: true,
    },
    rules: {
        type: [String],
        required: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    bgImageUrl: {
      type: String,
      trim: true,
    },
    coordinator: {
      type: String,
      required: true,
    },
    viceCoordinator: {
      type: String,
      required: true,
    },
    referees: {
      type: [{
        year: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      }],
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
sportSchema.plugin(toJSON);
sportSchema.plugin(paginate);

sportSchema.statics.isSportCreated = async function(name, excludeSportId){
    const sport = await this.findOne({name, _id: {$ne: excludeSportId}})
    return !!sport
}

const Sport = mongoose.model('Sport', sportSchema);

module.exports = Sport;
