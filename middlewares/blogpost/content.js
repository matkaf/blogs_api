const contentExists = (content) => {
  if (content === undefined) return { code: 400, message: '"content" is required' };

  if (!content.length) return { code: 400, message: '"content" empty is not allowed' };

  return { code: 200 };
};

module.exports = contentExists;
