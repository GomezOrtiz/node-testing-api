const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const coasterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    park: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: [String],
      default: undefined,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    length: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    speed: {
      type: Number,
      required: true,
    },
    inversions: {
      type: Number,
      required: true,
    },
    gForce: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
      max: new Date().getFullYear(),
    },
  },
  {
    timestamps: true,
  }
);

coasterSchema.plugin(toJSON);
coasterSchema.plugin(paginate);

coasterSchema.statics.isNameTaken = async function (name) {
  const coaster = await this.findOne({ name });
  return !!coaster;
};

const Coaster = mongoose.model('Coaster', coasterSchema);

module.exports = Coaster;
