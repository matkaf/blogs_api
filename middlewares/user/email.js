const isEmailValid = (email) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const isValid = regex.test(email);
  
  if (email === undefined) return { code: 400, message: '"email" is required' };

  if (!email.length) return { code: 400, message: '"email" is not allowed to be empty' };

  if (!isValid) return { code: 400, message: '"email" must be a valid email' };

  return { code: 201 };
};

module.exports = isEmailValid;
