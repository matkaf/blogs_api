const titleExists = (title) => {
  if (title === undefined) return { code: 400, message: '"title" is required' };

  if (!title.length) return { code: 400, message: '"title" empty is not allowed' };

  return { code: 200 };
};

module.exports = titleExists;
