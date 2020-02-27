const {
  userQueries
} = require('../../db/queries/index');
const bcrypt = require('bcrypt');
const { Parser, F, createToken } = require('../../helpers/index');


async function registration(ctx) {
  try {
    const { 
      email, 
      password, 
      organization_name 
    } = ctx.request.body;

    const { insertUser } = userQueries;

    const salt = await bcrypt.genSalt(10);
    passwordHash = await bcrypt.hash(password, salt);

    const test = await ctx.db.query(insertUser(), [email, passwordHash, organization_name])
  } catch (err) {
    console.log(err);
  }
}

async function login(ctx) {
  try {
    const {
      password,
      organization_name,
    } = ctx.request.body;

    const { selectUser } = userQueries;

    const response = await ctx.db.query(selectUser(), [organization_name]);

    const getUser = F.compose(
      F.getFirstFromArray,
      Parser.dbResponseParser
    );

    const user = getUser(response)


    const isPasswordCompare = await bcrypt.compare(password, user.password);

    
    const token = createToken(user)

    return token;
    //const isPasswordCompare = await bcrypt.compare(password, password);
      ///

  } catch (err) {
    console.log(err);
  }
}


module.exports = {
  registration,
  login,
}
