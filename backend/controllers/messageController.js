const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
  const { fromUserId, toUserId, message } = req.body;

  try {
    const newMessage = await Message.create({ fromUserId, toUserId, message });
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
};

exports.getMessages = async (req, res) => {
  const { id } = req.params; // userId

  try {
    const messages = await Message.findAll({
      where: { toUserId: id },
      include: [
        { model: Message, as: "fromUser", attributes: ["username"] },
        { model: Message, as: "toUser", attributes: ["username"] },
      ],
      order: [["timestamp", "ASC"]],
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
