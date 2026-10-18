require('dotenv').config();

module.exports = {
  development: {
    username: "postgres",
    password: "kL302006",
    database: "mi_base",
    host: "127.0.0.1",
    port: 5432,
    dialect: 'postgres',
  },
};