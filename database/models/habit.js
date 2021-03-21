const mongoose = require("mongoose");
const User = require("./user");
const Block = require("./block");
const Schema = mongoose.Schema;
const HabitSchema = new Schema({
  id: {
    type: String,
    unique: true,
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
  name: {
    type: String,
    required: "Name of the habit is required",
    trim: true,
    unique: true,
  },
  desc: {
    type: String,
  },
});

/**
 * save id before saving habit
 */
HabitSchema.pre("save", async function (next) {
  let habit = this;
  habit.id = this._id;
  return next();
});

/**
 * Remove dependencies on delete
 */
HabitSchema.pre("remove", function (next) {
  Block.remove({ habit: this._id }).exec();
  return next();
});

module.exports = Habit = mongoose.model("Habit", HabitSchema);
