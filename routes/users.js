const express = require('express');
const router = express.Router();
const { urlGoogle, getGoogleUser } = require('../controllers/handleGoogleLogin');

router.get("/",(req,res) => {

    const {token} = req.headers;
    if (!token) {
        return res.status(400).json({
            error : "Invalid token"
        })
    }
    res.status(200).json({
        user : getGoogleUser()
    });
})

module.exports = router;