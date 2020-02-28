const logger = require('koa-logger');
const bodyParser = require('koa-body-parser');
const passport = require('koa-passport');
const cors = require('@koa/cors');
const static = require('koa-static');
const path = require('path');
const koaSwagger = require('koa2-swagger-ui');


function middlewareRegistration(app) {
  app.use(bodyParser());
  app.use(logger());
  app.use(cors());
  console.log(path.resolve(__dirname, '../static'))
  app.use(static(path.resolve(__dirname, '../static')))

  require('../middlewares/passport');
  app.use(passport.initialize());

  app.use(
    koaSwagger({
      routePrefix: '/swagger', 
      swaggerOptions: {
        url: process.env.NODE_ENV === 'production'
          ? `${process.env.HOST_URL}/swagger.json`
          : 'http://localhost:3000/swagger.json'
      },
    }),
  );
}

module.exports = middlewareRegistration;
