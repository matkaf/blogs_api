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

const validateLogin = (email, password) => {
  const verify = [
    isEmailValid(email),
    isPasswordValid(password),
  ];
  
  const anyIssue = verify.find((res) => res.code !== 201);

  if (anyIssue) return anyIssue;

  return { code: 201 };
};

const findUser = async (email, password) => {
  const user = await User.findOne({
    where: { email, password },
  });

  if (!user) return { code: 400, message: 'Invalid fields' };

  return { code: 200 };
};

module.exports = {
  validateUser,
  createUser,
  validateLogin,
  findUser,
};