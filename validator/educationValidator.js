const Validator = require('validator');
const Utils = require('../utils');

const validateEducation = data => {
  let errors = {};
  // Change data fields to string
  const school = Utils.isEmpty(data.school) ? '' : data.school;
  const degree = Utils.isEmpty(data.degree) ? '' : data.degree;
  const fieldofstudy = Utils.isEmpty(data.fieldofstudy) ? '' : data.fieldofstudy;
  const from = Utils.isEmpty(data.from) ? '' : data.from;

  if (Validator.isEmpty(school)) {
    errors.school = 'School is required.'
  }
  if (Validator.isEmpty(degree)) {
    errors.degree = 'Degree is required.'
  }
  if (Validator.isEmpty(fieldofstudy)) {
    errors.fieldofstudy = 'Field of study is required.'
  }
  if (Validator.isEmpty(from)) {
    errors.from = 'Study from date is required.'
  }

  return {
    errors,
    isValid: Utils.isEmpty(errors)
  }
}

module.exports = validateEducation;