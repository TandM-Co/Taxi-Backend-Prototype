const { createTables } = require('../db/queries/index');

async function createDB(db) : Promise<void> {
  const tableStatus = await Promise.all([
    db.query(createTables.createUserTable()),
    db.query(createTables.createClientLimitTable()),
    db.query(createTables.createOperationTable()),
  ]);
  console.log(tableStatus);
}

module.exports = createDB;
