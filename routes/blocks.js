const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { getBlocks, addBlock } = require("../controllers/blocks");
const { ADMIN, USER } = require("../controllers/roles");

/**
 * Route to fetch all blocks
 * @name api/blocks/get
 * @method POST
 * @access Private
 * @inner
 * @param {string} path
 * @param {callback} middleware - Authenticate
 * @param   {callback} middleware - Handle HTTP response
 */
router.post("/get", auth([USER]), async (req, res) => {
  try {
    const query =
      req.auth.role === ADMIN ? req.body : { ...req.body, user: req.auth.id };
    const result = await getBlocks({ query });
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
 * Route to add a new block
 * @name    api/blocks
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
    const result = await addBlock({ ...req.body, user });
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

module.exports = router;
