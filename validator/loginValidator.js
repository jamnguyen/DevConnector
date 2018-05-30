const Validator = require('validator');
const Utils = require('../utils');

const validateLogin = data => {
  let errors = {};
  let email = Utils.isEmpty(data.email) ? '' : data.email;
  let password = Utils.isEmpty(data.password) ? '' : data.password;

  // Email
  if (!Validator.isEmail(email)) {
    errors.email = 'Email is invalid.';
  }
  if (Validator.isEmpty(email)) {
    errors.email = 'Email required.';
  }

  // Password
  if (Validator.isEmpty(password)) {
    errors.password = 'Password required.';
  }

  return {
    errors,
    isValid: Utils.isEmpty(errors)
  };
};

module.exports = validateLogin;