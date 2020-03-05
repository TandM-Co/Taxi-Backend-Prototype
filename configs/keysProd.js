module.exports = {
  DB: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: true,
  },
  SECRET_OR_KEY: process.env.SECRET_OR_KEY,
};
