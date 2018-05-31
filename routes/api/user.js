const express = require("express");
const router = express.Router();

const gravatar = require("gravatar");
//load user model
const Use = require("../../models/Users");

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
    }
  });
});

module.exports = router;
