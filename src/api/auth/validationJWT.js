const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../../model/usersModel');
const { unauthorized } = require('../../helpers/httpStatus');
const { jwtMalformed, missingAuthToken } = require('../../helpers/errors');

const secret = require('../../helpers/secretKey');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(unauthorized).json({ message: missingAuthToken });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const userTokenExists = await findUserByEmail(decoded.data.email);
    if (!userTokenExists) {
      return res.status(unauthorized).json({ message: jwtMalformed });
    }

    const { _id, email, role } = userTokenExists;

    req.userData = { _id, email, role };

    next();
  } catch (err) {
    return res.status(unauthorized).json({ message: jwtMalformed });
  }
};
