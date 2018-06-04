const express = require('express');

const router = express.Router();


//@routes Get api/post/test
//@desc Test post route
//@Acess Public 
router.get('/test', (req, res) => res.json({msg: "Posts Works"}));

module.exports = router; 