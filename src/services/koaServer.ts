const Koa = require('koa');

const { SERVER_PORT } = require('../constants/server');

function koaServer() {
  const app = new Koa;

  app.listen(SERVER_PORT, () => console.log('Server Start'));

  return app;
}

module.exports = koaServer;
