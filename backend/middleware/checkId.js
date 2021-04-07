const router = require('express').Router();
const User = require('../model/user') 
const veri = require('./tokenVeri');


router.get("/check", veri,async  (req, res) => {
    const userDet = await User.findOne({ _id: req.user.id })
    

    console.log("extracteid", userDet);
    res.send(userDet)
})
module.exports = router;