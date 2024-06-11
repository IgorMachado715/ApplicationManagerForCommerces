const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "newApp",
  process.env.DB_USER || "root",
  process.env.DB_PWD || "Popinho2010",
  {
    dialect: process.env.DB_DIALECT || "mysql",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    logging: process.env.DB_LOGS === "true",
  }
);

module.exports = sequelize;
