const logger = require('koa-logger');
const bodyParser = require('koa-body-parser');
const passport = require('koa-passport');
const cors = require('@koa/cors');
const koaStatic = require('koa-static');
const path = require('path');
const koaSwagger = require('koa2-swagger-ui');


function middlewareRegistration(app) {
  app.use(bodyParser());
  app.use(logger());
  app.use(cors());
  app.use(koaStatic(path.resolve(__dirname, '../static')))

  require('../middlewares/passport');
  app.use(passport.initialize());

  app.use(
    koaSwagger({
      routePrefix: '/swagger', 
      swaggerOptions: {
        url: 'http://localhost:3000/swagger.json', 
      },
    }),
  );
}

module.exports = middlewareRegistration;
