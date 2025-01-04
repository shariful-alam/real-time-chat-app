const app = require("./app");
const expressWs = require("express-ws");
const mongoose = require("./config/database");

const sequelize = require("./config/database");
const User = require("./models/User");
const Message = require("./models/Message");

(async () => {
  try {
    // Sync the models (creates tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  }
})();

const PORT = 5001;

// WebSocket setup
expressWs(app);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
