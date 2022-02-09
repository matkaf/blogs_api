const isNameValid = (name) => {
  if (!name) return { code: 400, message: '"displayName" is required' };
  
  const isString = typeof name === 'string';
  const validLength = name.length > 7;

  if (!isString) return { code: 400, message: '"name" is not a string' };

  if (!validLength) {
    return {
      code: 400, 
      message: '"displayName" length must be at least 8 characters long',
    };
  }

  return { code: 201 };
};

module.exports = isNameValid;
