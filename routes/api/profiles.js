const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");

//lod validation
const validateProfileInput = require("../../validation/profile");

// load profile model
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@routes Get api/profiles/test
//@desc Test profiles route
//@Acess Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Profile Works"
  })
);

//@routes Get api/profiles/
//@desc Get current users profile
//@Acess profile

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const errors = {};
    Profile.findOne({
      user: req.user.id
    })
      .populate("user", ["name", "avatar"])
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

//@routes Get api/profiles/handle/:handle
//@desc Get frofile by handle
//@access public

router.get('/handle:/handle', (req, res) => {
  const error = { };
  Profile.findOne({handle : req.param.handle})
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    if(!profile){
      errors.noprofile= "There is no profile for this user";
      res.status(404).json(errors)
    }

    res.json(profile);
  })
  .catch(err => res.status(404).json(err))
});


//@routes Get api/profiles/user/:user_id
//@desc Get frofile by userId
//@access public

router.get('/user/user_id', (req, res) => {
  const error = { };
  Profile.findOne({user: req.param.handle})
  .populate('user', ['name', 'avatar'])
  .then(profile => {
    if(!profile){
      errors.noprofile= "There is no profile for this user";
      res.status(404).json(errors)
    }
    res.json(profile);
  })
  .catch(err => res.status(404).json(err))
});



//@routes Get api/profiles/
//@desc Create User profile
//@access private

router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    //Get fields
    const profilefields = {};
    profilefields.user = req.body.id;
    if (req.body.handle) profilefields.handle = req.body.handle;
    if (req.body.company) profilefields.company = req.body.company;
    if (req.body.website) profilefields.website = req.body.website;
    if (req.body.location) profilefields.location = req.body.location;
    if (req.body.bio) profilefields.bio = req.body.bio;
    if (req.body.status) profilefields.status = req.body.status;
    if (req.body.githubusermame)
      profilefields.githubusermame = req.body.githubusermame;

    //Skills split into array
    if (typeof req.body.skills !== "undefined") {
      profilefields.skills = req.body.skills.split(",");
    }
    //Social
    profilefields.social = {};
    if (req.body.youtube) profilefields.youtube = req.body.youtube;
    if (req.body.twitter) profilefields.twitter = req.body.twitter;
    if (req.body.facebook) profilefields.facebook = req.body.facebook;
    if (req.body.youtube) profilefields.youtube = req.body.youtube;
    if (req.body.linkedin) profilefields.linkedin = req.body.linkedin;
    if (req.body.instagram) profilefields.instagram = req.body.instagram;

    Profile.findOne({
      user: req.user.id
    }).then(profile => {
      if (profile) {
        //update

        Profile.findOneAndUpdate(
          {
            user: req.user.id
          },
          {
            $set: profilefields
          },
          {
            new: true
          }
        ).then(profile => res.json(profile));
      } else {
        Profile.findOne({
          handle: profilefields.handle
        }).then(profile => {
          if (profile) {
            errors.handle = "that handle already exists";
            res.status(400).json(errors);
          }

          //save profile
          new Profile(profilefields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);
module.exports = router;
