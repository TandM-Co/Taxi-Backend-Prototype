const Koa = require('koa');

const { SERVER_DEV_PORT } = require('../constants/server');

function koaServer() {
  const app = new Koa;

  app.listen(SERVER_DEV_PORT, () => console.log('Server Start'));

  return app;
}

module.exports = koaServer;
