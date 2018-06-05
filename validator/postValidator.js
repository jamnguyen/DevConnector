const Utils = require('../utils');
const Validator = require('validator');

const validatePost = data => {
  let errors = {};
  const text = Utils.isEmpty(data.text) ? '' : data.text;

  if (!Validator.isLength(text, {min: 2, max: 2048})) {
    errors.text = 'Text must be between 2 and 2048 characters.';
  }

  if (Validator.isEmpty(text)){
    errors.text = 'Text is required.';
  }

  return {
    errors,
    isValid: Utils.isEmpty(errors)
  };
};

module.exports = validatePost;