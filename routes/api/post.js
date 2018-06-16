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
});

// @route   GET /api/post/:id
// @desc    Get a post
// @access  {Public}
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({nopostfound: 'Post is not found.'}));
});

// @route   GET /api/post
// @desc    Get all post with descending order
// @access  {Public}
router.get('/', (req, res) => {
  Post.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({nopostfound: 'No post found.'}))
});

// @route   DELETE /api/post/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (req.user.id !== post.user.toString()) {
        return res.status(401).json({notauthorized: 'User is not authorized.'});
      }
      post.remove().then(() => res.json({success: true}));
    }).catch(err => res.status(404).json({nopostfound: 'No post found.'}));
});

// @route   POST /api/post/like/:post_id
// @desc    Like a post
// @access  Private
router.post('/like/:post_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => {
      if (post.likes.filter(like => {
        return like.user.toString() === req.user.id
      }).length > 0) {
        return res.status(400).json({alreadylike: 'User already liked this post.'});
      }

      post.likes.unshift({user: req.user.id});
      post.save().then((post) => res.json(post));
    }).catch(err => res.status(404).json({nopostfound: 'No post found.'}));
});

// @route   POST /api/post/unlike/:post_id
// @desc    Unlike a post
// @access  Private
router.post('/unlike/:post_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => {
      if (post.likes.filter(like => {
        return like.user.toString() === req.user.id
      }).length <= 0) {
        res.status(400).json({notlikeyet: 'User did not like this post.'});
      }

      const removeIndex = post.likes
                            .map(like => like.user.toString())
                            .indexOf(req.user.id);
      post.likes.splice(removeIndex, 1);
      
      post.save().then((post) => res.json(post));
    }).catch(err => res.status(404).json({nopostfound: 'No post found.'}));
});

module.exports = router;