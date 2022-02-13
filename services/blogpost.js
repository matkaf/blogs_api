const validTitle = require('../middlewares/blogpost/title');
const validContent = require('../middlewares/blogpost/content');
const validCategoryIds = require('../middlewares/blogpost/categoryIds');

const { Category, BlogPost, PostsCategory } = require('../models');

const validateBlogPost = (title, content, categoryIds) => {
 const verify = [
   validTitle(title),
   validContent(content),
   validCategoryIds(categoryIds),
 ];

 const anyIssue = verify.find((res) => res.code !== 200);

  if (anyIssue) return anyIssue;

  return { code: 200 };
};

const validateCategoryId = async (categoryIds) => {
  const verifiedIds = await Promise.all(categoryIds.map(async (id) => {
    const exists = await Category.findOne({ where: id });
    return { id, exists };
  }));
  
  const someNull = verifiedIds.some((el) => !el.exists);

  if (someNull) return { code: 400, message: '"categoryIds" not found' };

  return { code: 200 };
};

const createBlogPost = async (title, content, userId) => {
  try {
    const post = await BlogPost.create({ title, content, userId });
    return post;
  } catch (error) {
    return { code: 500, message: 'DB connection issue creating BlogPost' };
  }
};

const registerIds = async (postId, categoryId) => {
  const registers = await Promise.all(categoryId.map(async (id) => {
    try {
      await PostsCategory.create({ categoryId: id, postId });
      return true;
    } catch (error) {
      return false;
    }
  }));

  return registers;
};

const getAll = async () => {
  try {
    const data = await BlogPost.findAll({
      include: [
        'user',
        { model: Category,
          as: 'categories',
          through: {
            attributes: [],
          },
        },     
      ],
    });
    return data;
  } catch (error) {
    return { code: 500, message: error.message };
  }
};

module.exports = {
  validateBlogPost,
  validateCategoryId,
  createBlogPost,
  registerIds,
  getAll,
};
