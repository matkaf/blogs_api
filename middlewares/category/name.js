const isNameValid = (name) => {
  if (name === undefined) return { code: 400, message: '"name" is required' };

  if (!name) return { code: 400, message: '"name" is not allowed to be empty' };
  
  const isString = typeof name === 'string';

  if (!isString) return { code: 400, message: '"name" is not a string' };

  return { code: 201 };
};

module.exports = isNameValid;