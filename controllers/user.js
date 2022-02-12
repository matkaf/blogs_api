const jwt = require('jsonwebtoken');
const User = require('../services/user');
require('dotenv').config();

const secret = process.env.JWT_SECRET;
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

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const validate = User.validateLogin(email, password);

  if (validate.code !== 201) return res.status(validate.code).json({ message: validate.message });

  next();
};

const findUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findUser(email, password);

  if (user.code === 400) return res.status(user.code).json({ message: user.message });

  next();
};

module.exports = {
  validateUser,
  createUser,
  validateLogin,
  findUser,
};