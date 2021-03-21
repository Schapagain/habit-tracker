const mongoose = require("mongoose");
const Habit = require("./habit");
const User = require("./user");

const Schema = mongoose.Schema;
const BlockSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: "user id is required",
    validate: {
      validator: async function (id) {
        const count = await User.countDocuments({ id });
        return count > 0;
      },
      message: "invalid user id",
    },
  },
  habit: {
    type: Schema.Types.ObjectId,
    ref: "Habit",
    required: "habit id is required",
    validate: {
      validator: async function (id) {
        const count = await Habit.countDocuments({ id });
        return count > 0;
      },
      message: "invalid habit id",
    },
  },
  startDate: {
    type: Date,
    required: "start date is required",
  },
  doneDays: {
    type: [Date],
    default: [],
  },
});

/**
 * save id before saving block
 */
BlockSchema.pre("save", async function (next) {
  let block = this;
  block.id = this._id;
  return next();
});

module.exports = Block = mongoose.model("Block", BlockSchema);
