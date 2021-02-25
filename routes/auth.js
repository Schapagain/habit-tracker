const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

/* GET Google Authentication API. */
router.get("/google",passport.authenticate("google",{scope: ["profile","email"]}));
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/", session: false }),
    (req,res) => {
        console.log(req.user);
        res.status(200).json(req.user);
    }
);

module.exports = router;