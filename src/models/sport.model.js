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
    rules: {
        type: [String],
        required: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
sportSchema.plugin(toJSON);
sportSchema.plugin(paginate);

sportSchema.statics.isSportCreated = async function(name){
    const sport = await this.findOne({name})
    return !!sport
}

const Sport = mongoose.model('Sport', sportSchema);

module.exports = Sport;
