const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { getHabits, addHabit } = require("../controllers/habits");
const { ADMIN, USER } = require("../controllers/roles");

/**
 * Route to fetch all habits
 * @name api/habits
 * @method GET
 * @access Private
 * @inner
 * @param {string} path
 * @param {callback} middleware - Authenticate
 * @param   {callback} middleware - Handle HTTP response
 */
router.get("/", auth([USER]), async (req, res) => {
  try {
    const query = req.auth.role === ADMIN ? {} : { user: req.auth.id };
    const result = await getHabits({ query });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(err.httpCode || 500).json({
      error: {
        msg: err.message,
      },
    });
  }
});

/**
 * Route to add a new habit
 * @name    api/habits
 * @method  POST
 * @access  Private
 * @inner
 * @param   {string} path
 * @param   {callback} middleware - Form Parser
 * @param   {callback} middleware - Handle HTTP response
 */
router.post("/", auth([USER]), async (req, res) => {
  try {
    const user = req.auth.role === ADMIN ? req.body.user : req.auth.id;
    const result = await addHabit({ ...req.body, user });
    res.status(201).json(result);
  } catch (err) {
    return res.status(err.httpCode || 500).json({
      error: {
        field: err.field,
        msg: err.message,
      },
    });
  }
});

/**
 * Route to fetch user details
 * @name api/users/:id
 * @method GET
 * @access Public
 * @inner
 * @param {string} path
 * @param {callback} middleware - Authenticate
 * @param   {callback} middleware - Handle HTTP response
 */
router.get("/:id", async (req, res) => {
  try {
    const attributes = ["id", "name", "email", "username"];
    let result = await getUsers({
      query: { id: req.params.id },
      attributes,
    });
    res.status(200).json(result);
  } catch (err) {
    return res.status(err.httpCode || 500).json({
      error: { msg: err.message },
    });
  }
});

/**
 * Route to update user info
 * @name    api/users/:id
 * @method  PATCH
 * @access  Private
 * @inner
 * @param   {string} path
 * @param   {callback} middleware - Authenticate
 * @param   {callback} middleware - Handle HTTP response
 */
router.patch("/:id", async (req, res) => {
  try {
    let result = await updateUser({ ...req.body, id: req.params.id });
    res.status(200).json(result);
  } catch (err) {
    res.status(err.httpCode || 500).json({
      error: { msg: err.message },
    });
  }
});

/**
 * Route to delete a user
 * @name    api/users
 * @method  DELETE
 * @access  ADMIN
 * @inner
 * @param   {string} path
 * @param   {callback} middleware - Form Parser
 * @param   {callback} middleware - Handle HTTP response
 */
router.delete(
  "/:id",
  // auth([ADMIN]),
  async (req, res) => {
    try {
      const result = await deleteUser(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      return res.status(err.httpCode || 500).json({
        error: { msg: err.message },
      });
    }
  }
);

module.exports = router;
