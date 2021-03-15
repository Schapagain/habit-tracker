const { getUsers } = require("./users");
const { CUSTOMER, ADMIN } = require("./roles");
const { makeItem } = require("./utils");
const njwt = require("njwt");
const { getOTP } = require("./password");
const { sendOTPEmail } = require("./email");

require("dotenv").config();
const { ValidationError, getError, NotAuthorizedError } = require("./errors");
const signingKey = process.env.NJWT_SIGNING_KEY;

/**
 * Generate a JWT for the given id
 * @param {String} id
 */
function getAuthToken(id, role) {
  const claims = {
    sub: id,
    scope: role,
  };
  const token = njwt.create(claims, signingKey);
  token.setExpiration(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);
  return token.compact();
}

/**
 * Validates the given admin password against the environment
 * @param {*} Credentials.password
 */
async function authenticateAdmin({ password }) {
  const correctPassword = process.env.ADMINPASSWORD;
  try {
    if (!password || correctPassword != password)
      throw new NotAuthorizedError();
    return {
      token: getAuthToken(ADMIN, ADMIN),
    };
  } catch (err) {
    throw await getError(err);
  }
}

/**
 * Validate given user credentials
 * @param {*} user
 */
async function authenticate(user) {
  try {
    if (!user || !(user.username || user.email))
      throw new ValidationError("username or email");
    if (!user.password) throw new ValidationError("password");

    const givenPassword = user.password;
    const users = await getUsers({
      query: user.email ? { email: user.email } : { username: user.username },
      attributes: ["id", "password", "username", "name", "email"],
    });
    user = users.data[0];
    if (!user) throw new NotAuthorizedError();
    let isMatch = await user.validatePassword(givenPassword);
    if (!isMatch) throw new NotAuthorizedError();

    return {
      token: getAuthToken(user.id, CUSTOMER),
      user: makeItem(user, ["id", "name", "email", "username"]),
    };
  } catch (err) {
    throw await getError(err);
  }
}
/**
 * Generate and send OTP via users email
 * @param {*} user
 */
async function sendOTP(user) {
  try {
    if (!user || !user.email) throw new ValidationError("email");

    const users = await getUsers({
      query: { email: user.email },
      attributes: ["_id", "name", "email"],
    });
    user = users.data[0];
    if (user) {
      const otp = getOTP();
      user.password = otp;
      user.save();
      sendOTPEmail(user.name, user.email, otp);
    }
  } catch (err) {
    throw await getError(err);
  }
}

/**
 * Reset users password to a new one
 * @param {*} user
 */
async function resetPassword(user) {
  try {
    if (!user || !user.id) throw new ValidationError("id");

    const { oldPassword, newPassword } = user;
    if (!oldPassword || !newPassword)
      throw new ValidationError("oldPassword or newPassword");

    const users = await getUsers({
      query: { id: user.id },
      attributes: ["email", "_id"],
    });
    user = users.data[0];
    await authenticate({ email: user.email, password: oldPassword });
    user.password = newPassword;
    await user.save();
  } catch (err) {
    throw await getError(err);
  }
}

/**
 * Return accepted token authorization methods
 */
function getValidAuthMethods() {
  return ["bearer"];
}

module.exports = {
  authenticate,
  authenticateAdmin,
  getAuthToken,
  getValidAuthMethods,
  sendOTP,
  resetPassword,
};
