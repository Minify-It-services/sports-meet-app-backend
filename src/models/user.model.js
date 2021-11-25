const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles, gameRoles } = require('../config/roles');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
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
    teams: {
      type: [{
        teamId: {
          type: mongoose.SchemaTypes.ObjectId,
        },
        teamName: {
          type: String,
        },
        sport: {
          type: String,
        },
        role: {
          type: String,
          enum: gameRoles,
          default: 'player',
        },
      }],
      default: [],
    },
    contactNumber: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.getMinimumDetail = async function() {
  return {
    id: this._id,
    name: this.name,
    contactNumber: this.contactNumber,
  }
}

userSchema.methods.updateAddTeams = async function(teamId, teamName, sportName, role) {
  this.teams = [
    ...this.teams,
    {
      teamId,
      sport: sportName,
      teamName,
      role,
    }
  ];
}

userSchema.methods.updateRemoveTeams = async function(teamId) {
  this.teams = this.teams.filter(team => Object.is(team.teamId, teamId));
}

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
