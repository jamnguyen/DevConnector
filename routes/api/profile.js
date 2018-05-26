const router = require('express').Router();

// @route   GET /api/profile/
// @desc    Test profiles route
// @access  Public
router.get('/', (req, res) => {
  res.json({message: 'Profile api works!'});
});

module.exports = router;