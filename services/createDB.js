const { createTables } = require('../db/queries/index');

async function createDB(db) {
  const tableStatus = await Promise.all([
    db.query(createTables.createUserTable())
  ]);
  console.log(tableStatus);
}

module.exports = createDB;
