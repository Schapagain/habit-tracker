const mongoose = require('mongoose');
const { Block, User } = require('.');
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
        required: 'Name of the meal is required',
        trim: true,
    },
    desc: {
        type: String,
    },
    blocks : [
        {
        type: Schema.Types.ObjectId,
        ref: "Block",
        required: "A habit needs at least one block",
        validate: {
            validator: async function (id) {
                const count = await Block.countDocuments({ id });
                return count > 0;
                },
                message: "Invalid block(s)",
            },
        },
    ],
});

/**
 * save id before saving habit
 */
HabitSchema.pre('save',async function(next) {
    let habit = this;
    habit.id = this._id;
    return next();
})

module.exports = Habit = mongoose.model('Habit',HabitSchema);