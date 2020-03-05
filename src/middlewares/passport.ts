const passportJWT = require('passport-jwt');
const passport = require('koa-passport');

const { KEYS } = require('../configs/index');


const { Strategy, ExtractJwt } = passportJWT;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: KEYS.SECRET_OR_KEY,
};

passport.use(
  new Strategy(
    jwtOptions,
    (async (ctx, next) => {
      try {
        next()
        //const user = await User.findById(payload.id);
        //done(null, user);
      } catch (err) {
        next()
        //done(err);
      }
    })
  ) 
);
