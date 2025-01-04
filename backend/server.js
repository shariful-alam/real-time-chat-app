const app = require("./app");
const expressWs = require("express-ws");
const mongoose = require("./config/database");

const PORT = 5000;

// WebSocket setup
expressWs(app);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
