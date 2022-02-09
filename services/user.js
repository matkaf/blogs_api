const { User } = require('../models');

const isNameValid = require('../middlewares/user/displayName');
const isEmailValid = require('../middlewares/user/email');
const isPasswordValid = require('../middlewares/user/password');

const validateUser = (body) => {
  const { displayName, email, password } = body;

  const verify = [
    isNameValid(displayName),
    isEmailValid(email),
    isPasswordValid(password),
  ];

  const anyIssue = verify.find((res) => res.code !== 201);

  if (anyIssue) return anyIssue;

  return { code: 201 };
};

const emailExists = async (email) => {
  try {
    const isRegistered = await User.findOne({ where: { email } });
    if (isRegistered) return { code: 400, message: 'User already registered' };
    return false;
  } catch (error) {
    return { code: 500, message: 'DB connection issue' };
  }
};

const createUser = async (body) => {
  try {
    const [user, created] = await User.findOrCreate({
      where: { email: body.email },
      defaults: body,
    });

    if (!created) return { code: 409, message: 'User already registered' };

    return { code: 201, message: user };
  } catch (error) {
    console.log(error);
    return { code: 500, message: error.message };
  }
};

module.exports = {
  validateUser,
  emailExists,
  createUser,
};