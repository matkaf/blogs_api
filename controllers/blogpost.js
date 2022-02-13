const BlogPost = require('../services/blogpost');

const validateBlogPost = (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  const verify = BlogPost.validateBlogPost(title, content, categoryIds);

  if (verify.code !== 200) return res.status(verify.code).json({ message: verify.message });

  next();
};

const validateCategoryId = async (req, res, next) => {
  const { categoryIds } = req.body;
  const result = await BlogPost.validateCategoryId(categoryIds);

  if (result.code !== 200) return res.status(result.code).json({ message: result.message });

  next();
};

const createBlogPost = async (req, res, next) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  const response = await BlogPost.createBlogPost(title, content, userId);

  if (response.code) return res.status(response.code).json({ message: response.message });

  req.post = response;

  next();
};

const registerIds = async (req, res) => {
  const { post } = req;
  const { categoryIds } = req.body;
  const userId = req.user.id;

  const response = await BlogPost.registerIds(post.id, categoryIds);

  const anyIssue = response.some((el) => !el);

  if (anyIssue) return res.status(500).json({ message: 'DB connection issue on registerIds' });

  return res.status(201).json({ id: post.id, userId, title: post.title, content: post.content });
};

const getAll = async (_req, res) => {
  const data = await BlogPost.getAll();

  if (data.code) return res.status(500).json({ message: data.message });

  return res.status(200).json(data);
};

module.exports = {
  validateBlogPost,
  validateCategoryId,
  createBlogPost,
  registerIds,
  getAll,
};
