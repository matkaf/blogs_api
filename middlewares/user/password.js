const isPasswordValid = (password) => {
  if (password === undefined) return { code: 400, message: '"password" is required' };

  if (!password.length) return { code: 400, message: '"password" is not allowed to be empty' };
  
  const validLength = password.length === 6;

  if (!validLength) {
    return {
      code: 400, 
      message: '"password" length must be 6 characters long',
    };
  }

  return { code: 201 };
};

module.exports = isPasswordValid;
