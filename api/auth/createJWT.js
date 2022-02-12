const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

module.exports = (req, res) => {
  const { email, password } = req.body;
  const user = {
    email,
    password,
  };
  
  const config = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  
  const token = jwt.sign({ data: user }, secret, config);

  return res.status(200).json({ token });
};
