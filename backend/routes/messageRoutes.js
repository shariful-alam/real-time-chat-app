const express = require("express");
const {
  sendMessage,
  getMessages,
} = require("../controllers/messageController");
const router = express.Router();

router.post("/", sendMessage); // Send a message
router.get("/:id", getMessages); // Get messages for a user

module.exports = router;
