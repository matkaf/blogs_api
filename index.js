const express = require('express');
const bodyParser = require('body-parser');

const User = require('./controllers/user');
const createToken = require('./api/auth/createJWT');

const app = express();

app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user', User.validateUser, User.createUser);

app.post('/login', User.validateLogin, User.findUser, createToken);
