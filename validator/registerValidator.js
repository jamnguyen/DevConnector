const Validator = require('validator');
const Utils = require('../utils');

const validateRegister = data => {
  let errors = {};
  let name = Utils.isEmpty(data.name) ? '' : data.name;
  let email = Utils.isEmpty(data.email) ? '' : data.email;
  let password = Utils.isEmpty(data.password) ? '' : data.password;
  let password_confirm = Utils.isEmpty(data.password_confirm) ? '' : data.password_confirm;

  // Name
  if (!Validator.isLength(name, {min: 2, max: 30})) {
    errors.name = 'Name must be between 2 and 30 characters.';
  }
  if (Validator.isEmpty(name)) {
    errors.name = 'Name required.';
  }

  // Email
  if (!Validator.isEmail(email)) {
    errors.email = 'Email is invalid.';
  }
  if (Validator.isEmpty(email)) {
    errors.email = 'Email required.';
  }

  // Password
  if (!Validator.isLength(password, {min: 6, max: 30})) {
    errors.password = 'Password must be between 6 and 30 characters.';
  }
  if (Validator.isEmpty(password)) {
    errors.password = 'Password required.';
  }

  // Confirm Password
  if (!Validator.equals(password, password_confirm)) {
    errors.password_confirm = 'Password confirm not match.';
  }

  return {
    errors,
    isValid: Utils.isEmpty(errors)
  };
};

module.exports = validateRegister;