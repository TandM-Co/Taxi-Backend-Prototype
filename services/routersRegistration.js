const {authenticationRoute} = require('../routes/v1/index');

function routerRegistration(app) {
  app.use(authenticationRoute.routes());
}

module.exports = routerRegistration;
