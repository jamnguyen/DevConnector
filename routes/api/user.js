const router = require('express').Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/User');
const keys = require('../../config/keys');
const Validator = require('../../validator');

// @route   GET /api/user/
// @desc    Test user route
// @access  Public
router.get('/test', (req, res) => {
  res.json({message: 'User api works!'});
});

// @route   POST /api/user/register
// @desc    Register new user
// @access  Public
router.post('/register', (req, res) => {
  // Validate first
  const {errors, isValid} = Validator.validateRegister(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: 'Email already exists!' });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });

});

// @route   POST /api/user/login
// @desc    Login / Return jwt token
// @access  Public
router.post('/login', (req, res) => {
  // Validate first
  const {errors, isValid} = Validator.validateLogin(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let email = req.body.email;
  let password = req.body.password;
  User
    .findOne({email})
    .then(user => {
      if (!user) {
        // User doesn't exist
        return res.status(400).json({email: 'Wrong email or password!', password: 'Wrong email or password!'});
      } else {
        bcrypt
          .compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              // Create payload
              const payload = { id: user.id, name: user.name, avatar: user.avatar };

              // Sign jwt token
              jwt.sign(
                payload,
                keys.jwtSecretKey,
                {
                  expiresIn: 3600
                },
                (err, token) => {
                  return res.json({success: true, token: 'Bearer ' + token})
                }
              );
            } else {
              return res.status(400).json({email: 'Wrong email or password!', password: 'Wrong email or password!'});
            }
          });
      }
    });
});

// @route   /api/user/current
// @desc    Return current logged in user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    res.json({
      message: `Hello ${req.user.name}`,
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);


module.exports = router;