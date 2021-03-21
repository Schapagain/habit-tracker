const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const { Habit } = require(".");
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
 * Remove dependencies on delete
 */
UserSchema.pre("remove", function (next) {
  console.log("removing user with dependencies..");
  Block.remove({ user: this._id }).exec();
  Habit.remove({ user: this._id }).exec();
  return next();
});

/**
 * Provide an API to compare passwords
 * @param {String} candidatePassword
 */
UserSchema.methods.validatePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
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

module.exports = User = mongoose.model("User", UserSchema);
