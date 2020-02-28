const jwtToken = require('jsonwebtoken');

const { KEYS } = require('../configs/index');
const { Token } = require('../models/index');


const createToken = async (user, expiresIn = '60d') => {
  const { id, role, loginName } = user;

  const tokenPayload = {
    loginName,
    id,
    role,
  };

  const token = await jwtToken.sign(
    tokenPayload,
    KEYS.SECRET_OR_KEY,
    { expiresIn },
  );

  return new Token(token);
};

module.exports = createToken;
