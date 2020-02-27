const dbConnection = require('./db/dbConnection');
const { 
  middlewareRegistration, 
  routersRegistration, 
  koaServer,
  createDB,
} = require('./services/index');

const app = koaServer();

middlewareRegistration(app);
routersRegistration(app);

const db = dbConnection();
createDB(db);
app.context.db = db;

db.connect().then(console.log('Db connected'));
