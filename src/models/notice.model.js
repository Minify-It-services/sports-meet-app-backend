const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const noticeSchema = mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    label: {
      type: String,
      enum: ['delayed', 'default winner', 'moved ahead', 'cancelled', 'important'],
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
noticeSchema.plugin(toJSON);
noticeSchema.plugin(paginate);

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;
