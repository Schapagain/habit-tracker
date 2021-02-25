const express = require('express');
const router = express.Router();
const passport = require("../config/passport");
/* GET Google Authentication API. */

function authenticate(req,res) {
    passport.authenticate("google",{scope: ["profile","email"]});
    res.status(200);
}

function receiveCallback(req,res) {
    passport.authenticate("google", { failureRedirect: "/", session: false });
    console.log(req.user);
    res.send("success!");
}

module.exports = {authenticate,receiveCallback};