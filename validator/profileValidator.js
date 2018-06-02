const Validator = require('validator');
const Utils = require('../utils');

const validateProfile = data => {
  let errors = {};

  // Map all to string so that Validator could use
  const handle = Utils.isEmpty(data.handle) ? '' : data.handle;
  const status = Utils.isEmpty(data.status) ? '' : data.status;
  const skills = Utils.isEmpty(data.skills) ? '' : data.skills;
  const website = Utils.isEmpty(data.website) ? '' : data.website;
  const youtube = Utils.isEmpty(data.youtube) ? '' : data.youtube;
  const twitter = Utils.isEmpty(data.twitter) ? '' : data.twitter;
  const linkedin = Utils.isEmpty(data.linkedin) ? '' : data.linkedin;
  const facebook = Utils.isEmpty(data.facebook) ? '' : data.facebook;
  const instagram = Utils.isEmpty(data.instagram) ? '' : data.instagram;

  if (!Validator.isEmpty(website) && !Validator.isURL(website)) {
    errors.website = 'Invalid url.';
  }
  if (!Validator.isEmpty(youtube) && !Validator.isURL(youtube)) {
    errors.youtube = 'Invalid url.';
  }
  if (!Validator.isEmpty(twitter) && !Validator.isURL(twitter)) {
    errors.twitter = 'Invalid url.';
  }
  if (!Validator.isEmpty(linkedin) && !Validator.isURL(linkedin)) {
    errors.linkedin = 'Invalid url.';
  }
  if (!Validator.isEmpty(facebook) && !Validator.isURL(facebook)) {
    errors.facebook = 'Invalid url.';
  }
  if (!Validator.isEmpty(instagram) && !Validator.isURL(instagram)) {
    errors.instagram = 'Invalid url.';
  }

  if (!Validator.isLength(handle, {min: 2, max: 40})) {
    errors.handle = 'Handle must be between 2 and 40 characters.';
  }
  if (Validator.isEmpty(handle)) {
    errors.handle = 'Handle is required.';
  }
  if (Validator.isEmpty(status)) {
    errors.status = 'Status is required.';
  }
  if (Validator.isEmpty(skills)) {
    errors.skills = 'Skills are required.';
  }

  return {
    errors,
    isValid: Utils.isEmpty(errors)
  }
}

module.exports = validateProfile;