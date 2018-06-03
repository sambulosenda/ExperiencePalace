const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//load user model
const User = require("../../models/User");
//@routes Get api/user/test
//@desc Test user route
//@Acess Public
router.get("/test", (req, res) => res.json({ msg: "user Works" }));

//@routes Get api/user/register
//@desc register user
//@Acess Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size
        r: "pg", //Rating
        d: "mm" //Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});


//@route GET api/users/login
//@disc Login User / Return JWT Token 
//@access Public

router.post('/login' , (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
  //Find user by email
  User.findOne({ email }).then(user => {
    if(!user){
      return res.status(400).json({ email: 'User not found'});
    }

    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if(isMatch){
          //User matched
          const payload = { id: user.id, name: user.name, avatar: user.avatar } // create jwt payload
          //Sign Token
          jwt.sign(
            payload,
             keys.secretOrKey, 
             { expiresIn: 3600},
             (err, token)=> {
               res.json({
               sucess: true, 
               boken: 'Bearer'+ token
               });
          });
      } else {
        return res.status(400).json({password: 'password incorrect'});
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);
module.exports = router;
