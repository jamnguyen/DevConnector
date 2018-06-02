const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Validator = require('../../validator');

// Load Schema
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route   GET /api/profile/test
// @desc    Test profiles route
// @access  Public
router.get('/test', (req, res) => {
  res.json({message: 'Profile api works!'});
});

// @route   GET /api/profile/
// @desc    Return profile of current logged in user
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    let errors = {};
    Profile.findOne({user: req.user.id})
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user.';
          return res.status(404).json(errors);
        }
        return res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST /api/profile/
// @desc    Create or update user's profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    // Validate first
    const {errors, isValid} = Validator.validateProfile(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get all fields from request
    let profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    if(typeof req.body.skills !== 'undefined') profileFields.skills = req.body.skills.split(',');
    
    profileFields.social = {};    
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({user: req.user.id})
      .then(profile => {
        if (profile) {
          // Update user's profile

          // Check if handle exist
          Profile.findOne({handle: profileFields.handle})
          .then(profile => {
            // Compare ObjectId vs String
            if (profile && profile.user != req.user.id) {
              errors.handle = 'This handle already exists.';
              return res.status(400).json(errors);
            } else {
              Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileFields},
                {new: true}
              ).then(profile => res.json(profile));
            }
          });
        } else {
          // Create new profile

          // Check if handle exist
          Profile.findOne({handle: profileFields.handle})
          .then(profile => {
            if (profile) {
              errors.handle = 'This handle already exists.';
              return res.status(400).json(errors);
            } else {
              new Profile(profileFields).save().then(profile => res.json(profile));
            }
          });
        }
      })
  }
);

module.exports = router;