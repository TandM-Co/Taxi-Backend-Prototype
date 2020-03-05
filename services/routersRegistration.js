const { authenticationRoute, clientRoute } = require('../routes/v1/index');

function routerRegistration(app) {
  app.use(authenticationRoute.routes());
  app.use(clientRoute.routes());
}

module.exports = routerRegistration;
