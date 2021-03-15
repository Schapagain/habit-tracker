const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const UserSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: "Full name is required",
      trim: true,
      validate: {
        validator: async function (name) {
          return !name || name.split(" ").length > 1;
        },
        message: "Full name is required",
      },
    },
    username: {
      type: String,
      unique: true,
      required: "username is required",
      validate: {
        validator: (username) => username.length > 4,
        message: "username must be at least four characters long",
      },
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      validate: {
        validator: function (password) {
          return password && password.length > 4;
        },
        message: "password should be at least five characters long",
      },
    },
    habits: [
      {
        type: Schema.Types.ObjectId,
        ref: "Habit",
        validate: {
          validator: async function (id) {
            const count = await Habit.countDocuments({ id });
            return count > 0;
          },
          message: "Invalid habit(s)",
        },
      },
    ],
  },
  { timestamps: true }
);

/**
 * Hash password and save id before saving user
 */
UserSchema.pre("save", async function (next) {
  let user = this;
  // save id
  user.id = user._id;
  // hash password
  if (!user.isModified("password")) return next();
  user.password = await generatePasswordHash(user.password);
  return next();
});

/**
 * Provide an API to compare passwords
 * @param {String} candidatePassword
 */
UserSchema.methods.validatePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", UserSchema);

/** Provide an API to add new habits
 * @param {String} habitId
 */
UserSchema.methods.addHabit = async function (habitId) {
  let user = this;
  const response = await User.updateOne(
    { id: user.id },
    { $push: { habits: habitId } },
    { runValidators: true }
  );
  console.log("adding habit:", response);
};

/**
 * Convert the given plaintext password to a hash
 * @param {String} passwordPlain
 */
async function generatePasswordHash(passwordPlain) {
  try {
    const saltRounds = 5;
    const passwordHash = await bcrypt.hash(passwordPlain, saltRounds);
    return passwordHash;
  } catch (err) {
    throw err;
  }
}

module.exports = User;
