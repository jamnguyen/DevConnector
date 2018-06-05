const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Validator = require('../../validator');

const Post = require('../../models/Post');

// @route   GET /api/post/test
// @desc    Test posts route
// @access  Public
router.get('/test', (req, res) => {
  res.json({message: 'Post api works!'});
});

// @route   POST /api/post
// @desc    Create new post
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {errors, isValid} = Validator.validatePost(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  }

  const newPost = new Post({
    user: req.user.id,
    name: req.body.name,
    avatar: req.body.avatar,
    text: req.body.text
  });

  newPost.save().then(post => res.json(post));
})

module.exports = router;