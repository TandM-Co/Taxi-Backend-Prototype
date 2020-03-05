const { Client } = require('pg');

const {KEYS} = require('../configs/index');


function dbConnection() {
  const dbClient = new Client(KEYS.DB);

  return dbClient;
}

module.exports = dbConnection;
