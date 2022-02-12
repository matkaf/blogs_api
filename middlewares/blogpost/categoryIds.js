const categoryIdsExists = (categoryIds) => {
  if (categoryIds === undefined) return { code: 400, message: '"categoryIds" is required' };

  if (!categoryIds.length) return { code: 400, message: '"categoryIds" empty is not allowed' };

  return { code: 200 };
};

module.exports = categoryIdsExists;
