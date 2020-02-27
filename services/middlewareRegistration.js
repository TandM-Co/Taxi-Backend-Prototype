const logger = require('koa-logger');
const bodyParser = require('koa-body-parser');
const passport = require('koa-passport');


function middlewareRegistration(app) {
  app.use(bodyParser());
  app.use(logger());

  require('../middlewares/passport');
  app.use(passport.initialize());
}

module.exports = middlewareRegistration;
