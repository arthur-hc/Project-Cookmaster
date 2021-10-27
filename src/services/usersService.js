const usersModel = require('../model/usersModel');
const { containsAllParams, isValidEmail } = require('../validations/index');
const { 
  invalidEntries,
  emailInUse,
} = require('../helpers/errors');

const signin = async (name, email, password) => {
  if (!containsAllParams([name, email, password]) || !isValidEmail(email)) {
    return { err: { message: invalidEntries } };
  }
  const emailAlreadyinUse = await usersModel.findUserByEmail(email);

  if (emailAlreadyinUse) {
    return { err: { message: emailInUse } };
  }

  const role = 'user';

  const response = await usersModel.signin({ name, email, password, role });

  return response;
};

module.exports = {
  signin,
};