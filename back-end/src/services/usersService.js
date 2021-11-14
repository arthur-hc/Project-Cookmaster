const usersModel = require('../model/usersModel');
const { containsAllParams, isValidEmail, isAdmin } = require('../validations/index');
const { 
  invalidEntries,
  emailInUse,
  emptyLoginFields,
  incorrectUserOrPass,
  onlyAdminsRegister,
} = require('../helpers/errors');
const generateJWT = require('../api/auth/generateJWT');

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

const login = async (email, password) => {
  if (!containsAllParams([email, password])) {
    return { err: { message: emptyLoginFields } };
  }

  const userData = await usersModel.findUserByEmail(email);
  
  if (!userData || userData.password.toString() !== password) {
    return { err: { message: incorrectUserOrPass } };
  }

  const { _id, role } = userData;
  const token = generateJWT({ _id, email, role });

  return token;
};

const registerAdmin = async (name, email, password, role) => {
  if (!isAdmin(role)) {
    return { err: { message: onlyAdminsRegister } };
  }

  const response = await usersModel.signin({ name, email, password, role });

  return response;
};

module.exports = {
  signin,
  login,
  registerAdmin,
};