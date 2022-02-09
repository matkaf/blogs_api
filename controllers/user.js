const jwt = require('jsonwebtoken');
const User = require('../services/user');

const secret = 'backendehbomdms';
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const validateUser = (req, res, next) => {
  const { body } = req;
  const validation = User.validateUser(body);

  if (validation.code !== 201) {
    return res.status(validation.code).json({ message: validation.message });
  }

  next();
};

const createUser = async (req, res) => {
  const { body } = req;
  const { code, message } = await User.createUser(body);

  if (code !== 201) return res.status(code).json({ message });

  const token = jwt.sign({ data: { email: body.email, password: body.password } },
    secret,
    jwtConfig);

  return res.status(code).json({ token });
};

module.exports = {
  validateUser,
  createUser,
};