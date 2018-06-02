const Validator = require('validator');
const Utils = require('../utils');

const validateExperience = data => {
  let errors = {};
  // Change data fields to string
  const title = Utils.isEmpty(data.title) ? '' : data.title;
  const company = Utils.isEmpty(data.company) ? '' : data.company;
  const from = Utils.isEmpty(data.from) ? '' : data.from;

  if (Validator.isEmpty(title)) {
    errors.title = 'Work title is required.'
  }
  if (Validator.isEmpty(company)) {
    errors.company = 'Company is required.'
  }
  if (Validator.isEmpty(from)) {
    errors.from = 'Work from date is required.'
  }

  return {
    errors,
    isValid: Utils.isEmpty(errors)
  }
}

module.exports = validateExperience;