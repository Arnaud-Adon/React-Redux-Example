const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  secret: process.env.JWT_KEY,
  port: process.env.PORT,
  databaseUser: process.env.BDD_USER,
  databasePassword: process.env.BDD_PASSWORD,
  databaseName: process.env.BDD_DBNAME,
};
