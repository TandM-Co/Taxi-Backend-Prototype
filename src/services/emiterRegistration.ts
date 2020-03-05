const { errorHandler } = require('../middlewares/index');

function emiterRegistration(app) {
  app.on('error', async (error, ctx) => {
    errorHandler(error, ctx);
  })
}

module.exports = emiterRegistration;
