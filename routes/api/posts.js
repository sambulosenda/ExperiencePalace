const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
// Post model;
const Post = require("../../models/Post");
// Profile model
const Profile = require("../../models/Profile");
//Validation
const validatePostInput = require("../../validation/post");

//@routes Get api/post/test
//@desc Test post route
//@Acess Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));


//@routes Get api/post/
//@desc Get all Posts 
//@Acess private
router.get('/',(req, res) => {
  Post.find()
  .sort({date: -1})
  .then(posts => res.json(posts))
  .catch(err => res.status(404));
});



//@routes Get api/post/
//@desc Test post route
//@Acess private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    // check Validation
    if (!isValid) {
      //If errors, send 400 with errors object
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.name,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

module.exports = router;
