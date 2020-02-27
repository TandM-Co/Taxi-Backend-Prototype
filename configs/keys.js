const DEV_KEY = require('./keysDev');
const PROD_KEY = require('./keysProd');

module.exports = process.env.NODE_ENV === 'production' ? PROD_KEY : DEV_KEY;