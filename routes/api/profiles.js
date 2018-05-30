const express = require('express');

const router = express.Router();


//@routes Get api/profiles/test
//@desc Test profiles route
//@Acess Public 
router.get('/test', (req, res) => res.json({msg: "Profile Works"}));


module.exports = router; 