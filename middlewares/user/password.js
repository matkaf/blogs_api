const isPasswordValid = (password) => {
  if (!password) return { code: 400, message: '"password" is required' };
  
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
