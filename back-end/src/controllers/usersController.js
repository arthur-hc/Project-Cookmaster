const usersService = require('../services/usersService');
const { invalidEntries, emailInUse } = require('../helpers/errors');
const {
  badRequest,
  conflict,
  created,
  unauthorized,
  ok,
  forbidden,
} = require('../helpers/httpStatus');

const signin = async (req, res) => {
  const { name, email, password } = req.body;

  const response = await usersService.signin(name, email, password);

  const { err } = response;

  if (err && err.message === invalidEntries) {
    return res.status(badRequest).json(err);
  }

  if (err && err.message === emailInUse) {
    return res.status(conflict).json(err);
  }

  return res.status(created).json(response);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const response = await usersService.login(email, password);

  const { err } = response;

  if (err) {
    return res.status(unauthorized).json(err);
  }

  return res.status(ok).json(response);
};

const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const { role } = req.userData;

  const response = await usersService.registerAdmin(name, email, password, role);

  const { err } = response;

  if (err) {
    return res.status(forbidden).json(err);
  }

  return res.status(created).json(response);
};

module.exports = {
  signin,
  login,
  registerAdmin,
};
