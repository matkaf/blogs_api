const express = require('express');
const bodyParser = require('body-parser');

const User = require('./controllers/user');
const Category = require('./controllers/category');
const BlogPost = require('./controllers/blogpost');
const createToken = require('./api/auth/createJWT');
const validateToken = require('./api/auth/validateJWT');

const app = express();

app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/user/:id', validateToken, User.getById);

app.get('/user', validateToken, User.getAll);

app.post('/user', User.validateUser, User.createUser);

app.post('/login', User.validateLogin, User.findUser, createToken);

app.get('/categories', validateToken, Category.getAll);

app.post('/categories', validateToken, Category.validateCategory, Category.createCategory);

app.post('/post', validateToken,
BlogPost.validateBlogPost, BlogPost.validateCategoryId,
BlogPost.createBlogPost, BlogPost.registerIds);