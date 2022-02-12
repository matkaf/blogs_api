const { Category } = require('../models');
const isNameValid = require('../middlewares/category/name');

const validateCategory = (name) => {
  const verify = isNameValid(name);

  return verify;
};

const createCategory = async (name) => {
  try {
    const [category, created] = await Category.findOrCreate({
      where: { name },
      defaults: { name },
    });

    if (!created) return { code: 409, message: 'Category already registered' };

    return { code: 201, category };
  } catch (error) {
    return { code: 500, message: error.message };
  }
};

module.exports = {
  createCategory,
  validateCategory,
};
