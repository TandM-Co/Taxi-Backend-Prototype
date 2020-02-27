const jwtToken = require('jsonwebtoken');

const { KEYS } = require('../configs/index');

const createToken = async (user, expiresIn = '60d') => {
  const { id, role, loginName } = user;

  const tokenPayload = {
    loginName,
    id,
    role,
  };

  return jwtToken.sign(
    tokenPayload,
    KEYS.SECRET_OR_KEY,
    { expiresIn },
  );
};

module.exports = createToken;
