const Category = require('../services/category');

const validateCategory = (req, res, next) => {
  const { name } = req.body;
  const verify = Category.validateCategory(name);

  if (verify.code !== 201) return res.status(verify.code).json({ message: verify.message });

  next();
};

const createCategory = async (req, res) => {
  const { name } = req.body;
  const response = await Category.createCategory(name);

  if (response.code !== 201) return res.status(response.code).json({ message: response.message });

  return res.status(response.code).json(response.category);
};

const getAll = async (_req, res) => {
  const data = await Category.getAll();

  if (data.code) return res.status(data.code).json({ message: data.message });

  return res.status(200).json(data);
};

module.exports = {
  createCategory,
  validateCategory,
  getAll,
};
