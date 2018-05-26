const router = require('express').Router();

// @route   GET /api/posts/
// @desc    Test posts route
// @access  Public
router.get('/', (req, res) => {
  res.json({message: 'Post api works!'});
});

module.exports = router;