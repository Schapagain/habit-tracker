const express = require('express');
const router = express.Router();
const { urlGoogle } = require('../controllers/handleGoogleLogin');

router.get("/google",(req,res) => {
    res.status(200).json({
        url : urlGoogle()
    });
})

module.exports = router;