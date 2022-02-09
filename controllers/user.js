const User = require('../services/user');

const validateUser = (req, res, next) => {
  const { body } = req;
  const validation = User.validateUser(body);

  if (validation.code !== 201) {
    return res.status(validation.code).json({ message: validation.message });
  }

  next();
};

const emailExists = async (req, res, next) => {
  const { email } = req.body;
  const isRegistered = await User.emailExists(email);

  if (isRegistered) return res.status(isRegistered.code).json({ message: isRegistered.message });

  next();
};

const createUser = (_req, res) => {
  const token = 0;

  return res.status(201).json(token);
};

module.exports = {
  validateUser,
  emailExists,
  createUser,
};