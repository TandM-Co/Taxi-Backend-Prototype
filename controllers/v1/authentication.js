const bcrypt = require('bcrypt');
const R = require('ramda');

const { Parser, F, dbErrorHandler } = require('../../helpers/index');
const { userQueries } = require('../../db/queries/index');
const { ErrorResponse, Response } = require('../../models/index');


async function registration(ctx) {
  const { 
    email, 
    password, 
    organization_name 
  } = ctx.request.body;

  const { insertUser } = userQueries;

  const salt = await bcrypt.genSalt(10);
  passwordHash = await bcrypt.hash(password, salt);

  const userResponse = await dbErrorHandler(
    ctx.db.query(insertUser(), [email, passwordHash, organization_name]),
    {message: null, status: 400}
  )

  const rowLens = R.lensPath(['rows']);
  const curryView = R.curry(R.view);

  const getUser = R.pipe(
    curryView(rowLens),
    F.getFirstFromArray
  );

  const user = getUser(userResponse)

  return user;
}

async function login(ctx) {
  const {
    password,
    organization_name,
  } = ctx.request.body;

  const { selectUser } = userQueries;

  const response = new Response(
    await ctx.db.query(selectUser(), [organization_name])
  );

  if (response.isEmpty) {
    throw new ErrorResponse({message: 'Incorrect credentials'} , 400)
  }

  const getUser = F.compose(
    F.getFirstFromArray,
    Parser.dbResponseParser
  );

  const user = getUser(response)

  const isPasswordCompare = await bcrypt.compare(password, user.password);

  if (isPasswordCompare) {
    throw new ErrorResponse({message: 'Incorrect credentials'} , 400)
  }

  return user;
};


module.exports = {
  registration,
  login,
};
