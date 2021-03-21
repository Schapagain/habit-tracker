const { queryDatabase } = require("../database");
const { Habit, Block } = require("../database/models");
const { addBlock } = require("./blocks");
const { getError } = require("./errors");
const { makeItem } = require("./utils");
const mongoose = require("mongoose");

/**
 * Save habit info to the database
 * @param {*} habit
 */
async function addHabit(habit) {
  try {
    if (!habit) throw ValidationError("habit");

    const habitFields = ["user", "name", "desc"];
    let newHabit = makeItem(habit, habitFields);

    const session = await mongoose.startSession();
    session.startTransaction();

    newHabit = new Habit(newHabit);
    newHabit = await newHabit.save();

    let newBlock = new Block({
      user: newHabit.user,
      habit: newHabit._id,
      startDate: habit.startDate,
    });
    newBlock = await newBlock.save();

    session.endSession();

    return { habit: makeItem(newHabit, ["id", "user", "name"]) };
  } catch (err) {
    throw await getError(err);
  }
}

/**
 * Get habits info from database
 * @param {Object} query
 * @param {String[]} attributes
 */
async function getHabits({
  query,
  attributes = ["id", "user", "name", "desc", "blocks"],
}) {
  let habits;
  try {
    if (!query || !query.id) {
      habits = await queryDatabase({ model: Habit, query, attributes });
    } else {
      habits = await _checkHabitPresence({ query, attributes });
    }
  } catch (err) {
    throw await getError(err);
  }

  return { count: habits.length, data: habits };
}

/**
 * Check if the habit with the given parameters exists in the database
 * @param {object} query
 * @param {String[]} attributes
 */
async function _checkHabitPresence({ query, attributes = ["id"] }) {
  try {
    const habits = await queryDatabase({ model: Habit, query, attributes });
    if (!habits || !habits.length) throw new NotFoundError("habit");
    return habits;
  } catch (err) {
    throw await getError(err);
  }
}

module.exports = {
  getHabits,
  addHabit,
};
