const { queryDatabase } = require("../database");

// Import the user model
const { User } = require("../database/models");
const { getError, ValidationError, NotFoundError } = require("./errors");
const { sendActivationEmail } = require("./email");
const { makeItem } = require("./utils");
const { getOTP } = require("./password");

/**
 * Save user info to the database
 * and user files into the disk
 * @param {*} user
 */
async function signupUser(user) {
  try {
    if (!user) throw ValidationError("user");

    const signupFields = ["name", "email", "username"];
    let newUser = makeItem(user, signupFields);
    newUser.password = getOTP();
    user = new User(newUser);
    user = await user.save();
    sendActivationEmail(user.name, user.email, newUser.password);
    return { user: makeItem(user, ["id", "name", "email"]) };
  } catch (err) {
    if (user.idCard) deleteFiles(user.idCard);
    throw await getError(err);
  }
}

/**
 * Get users info from database
 * @param {Object} query
 * @param {String[]} attributes
 */
async function getUsers({
  query,
  attributes = ["id", "name", "email", "username"],
}) {
  let users;
  try {
    if (!query || !query.id) {
      users = await queryDatabase({ model: User, query, attributes });
    } else {
      users = await _checkUserPresence({ query, attributes });
    }
  } catch (err) {
    throw await getError(err);
  }

  return { count: users.length, data: users };
}

/**
 * Check if the user with the given parameters exists in the database
 * @param {object} query
 * @param {String[]} attributes
 */
async function _checkUserPresence({ query, attributes = ["id"] }) {
  try {
    const users = await queryDatabase({ model: User, query, attributes });
    if (!users || !users.length) throw new NotFoundError("user");
    return users;
  } catch (err) {
    throw await getError(err);
  }
}

/**
 * get all elements that exists in both arrays
 * Note: will includes any duplicates in array1
 * @param {Array} array1
 * @param {Array} array2
 */
function getInsersection(array1, array2) {
  return array1.filter(function (n) {
    return array2.indexOf(n) !== -1;
  });
}

/**
 * Update given properties for the user
 * @param {*} user
 */
async function updateUser(
  user,
  attributes = ["_id", "id", "name", "email", "username"]
) {
  try {
    if (!user) throw new ValidationError("user");
    let oldUser = await _checkUserPresence({
      query: { id: user.id },
      attributes,
    });

    let keysToUpdate = Object.keys(user);
    keysToUpdate = getInsersection(["email", "username", "name"], keysToUpdate);
    user = makeItem(user, keysToUpdate);

    // update key values
    keysToUpdate.forEach((key) => {
      oldUser[key] = user[key];
    });
    user = await oldUser.save();

    console.log(user);

    return { user: makeItem(user, ["id", ...keysToUpdate]) };
  } catch (err) {
    throw await getError(err);
  }
}

/**
 * Remove user from the database
 * and user files from the disk
 * @param {*} user
 */
async function deleteUser(id) {
  try {
    await _checkUserPresence({ query: { id } });
    await User.deleteOne({ id });
    return { id };
  } catch (err) {
    throw await getError(err);
  }
}

module.exports = { getUsers, signupUser, updateUser, deleteUser };
