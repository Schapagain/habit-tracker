const express = require("express");
const router = express.Router();
const { urlGoogle } = require("../controllers/handleGoogleLogin");
const { authenticate, authenticateAdmin } = require("../controllers/auth");
router.get("/google", (req, res) => {
  res.status(200).json({
    url: urlGoogle(),
  });
});

/**
 * Route to authenticate admin credentials
 * @name api/auth/admin
 * @method POST
 * @access Public
 * @inner
 * @param {string} path
 * @param {callback} middleware - Form Parser
 * @param   {callback} middleware - Handle HTTP response
 */
router.post("/admin", async (req, res) => {
  try {
    const result = await authenticateAdmin(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.httpCode || 500).json({ error: err.message });
  }
});

/**
 * Route to authenticate credentials
 * @name api/auth
 * @method POST
 * @access Public
 * @inner
 * @param {string} path
 * @param {callback} middleware - Form Parser
 * @param   {callback} middleware - Handle HTTP response
 */
router.post("/", async (req, res) => {
  try {
    const result = await authenticate(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.httpCode || 500).json({ error: err.message });
  }
});

module.exports = router;
