const { isValidMongooseId, queryDatabase } = require("../database");

// Import the user model
const { User } = require("../database/models");
const { getError, ValidationError, NotFoundError } = require("./errors");
const { sendActivationEmail } = require("./email");
const {
  getRandomCode,
  getServerURL,
  makeItem,
} = require("./utils");

/**
 * Save user info to the database
 * and user files into the disk
 * @param {*} user
 */
async function signupUser(user) {
    try {
        if (!user) throw ValidationError('user');

        const signupFields = ['name','email','username'];
        let newUser = makeItem(user,signupFields);
        
        newUser = new User(user);
        user = await newUser.save();
        console.log(newUser);
        // generate activation link for the user and send email
        // const activationLink = generateActivationLink(user);
        // sendActivationEmail(user.name, user.email, activationLink);
    
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
        users = await checkUserPresence({ query, attributes });
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
async function checkUserPresence({ query, attributes = ["id"] }) {
    try {
      const user = await queryDatabase({ model: User, query, attributes });
      if (!user) throw new NotFoundError("user");
      return user;
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
function getInsersection(array1,array2) {
    return array1.filter(function(n) {
        return array2.indexOf(n) !== -1;
    });
}


/**
 * Update given properties for the user
 * @param {*} user
 */
async function updateUser(user, attributes=["_id","id","name","email","username"]) {
    try {
        if (!user) throw new ValidationError("user");
        let oldUser = await checkUserPresence({ query: { id: user.id }, attributes });

        let keysToUpdate = Object.keys(user);
        keysToUpdate = getInsersection(["email","username","name"],keysToUpdate);
        user = makeItem(user,keysToUpdate);

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
      await checkUserPresence({ query: { id } });
      await User.deleteOne({ id });
      return { id };
    } catch (err) {
      throw await getError(err);
    }
  }

module.exports = { getUsers, signupUser, updateUser, deleteUser }