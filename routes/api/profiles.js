const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

// load profile model
const Profile = require("../../models/Profile");
const User = require('../../models/User');

//@routes Get api/profiles/test
//@desc Test profiles route
//@Acess Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

//@routes Get api/profiles/
//@desc Get current users profile
//@Acess profile

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@routes Get api/profiles/
//@desc Create User profile
//@Acess profile

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

   //Get fields 
   const profilefields = {};

   profilefields.user = req.body.id;
   if(req.body.handle)  profilefields.handle = req.body.handle;
   if(req.body.company) profilefields.company = req.body.company;
   if(req.body.website) profilefields.website = req.body.website;
   if(req.body.location) profilefields.handle = req.body.location;
   if(req.body.bio) profilefields.handle = req.body.bio;
   if(req.body.status) profilefields.handle = req.body.status;
   if(req.body.company) profilefields.handle = req.body.company;
   if(req.body.company) profilefields.handle = req.body.company;
   if(req.body.company) profilefields.handle = req.body.company;
   if(req.body.company) profilefields.handle = req.body.company;
  }

);
module.exports = router;

