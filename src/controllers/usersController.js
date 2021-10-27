const usersService = require('../services/usersService');
const { invalidEntries, emailInUse } = require('../helpers/errors');
const {
  badRequest,
  conflict,
  created,
  unauthorized,
  ok,
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

module.exports = {
  signin,
  login,
};
