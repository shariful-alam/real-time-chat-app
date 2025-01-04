const { Sequelize } = require("sequelize");

// MySQL Connection Configuration
const sequelize = new Sequelize("chat_app", "root", "11223344", {
  host: "localhost",
  dialect: "mysql",
});

// Test the MySQL Connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to MySQL:", error);
  }
})();

module.exports = sequelize;
