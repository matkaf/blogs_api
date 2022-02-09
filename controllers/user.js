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

const createUser = async (req, res) => {
  const token = 'fsagdahdhdfhteste';
  const { body } = req;
  const { code, message } = await User.createUser(body);

  if (code !== 201) return res.status(code).json({ message });

  return res.status(code).json({ token });
};

module.exports = {
  validateUser,
  emailExists,
  createUser,
};