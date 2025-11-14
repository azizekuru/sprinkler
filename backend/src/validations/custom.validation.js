const { roles } = require('../config/roles');

const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 6) {
    return helpers.message('password must be at least 6 characters');
  }
  
  return value;
};

const validRoles = (value, helpers) => {
  if (!roles.includes(value)) {
    return helpers.message(`"{{#label}}" must be a valid role, one of ${roles}`);
  }
  return value;
};

module.exports = {
  objectId,
  password,
  validRoles,
};
