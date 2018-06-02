const router = require('express').Router();

// @route   GET /api/posts/test
// @desc    Test posts route
// @access  Public
router.get('/test', (req, res) => {
  res.json({message: 'Post api works!'});
});

module.exports = router;