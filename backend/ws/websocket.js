const Message = require("../models/Message");

const clients = {};

exports.initWebSocket = (app) => {
  app.ws("/ws", (ws, req) => {
    ws.on("message", async (msg) => {
      const data = JSON.parse(msg);

      if (data.type === "connect") {
        clients[data.userId] = ws;
      }

      if (data.type === "message") {
        const { from, to, message } = data;
        const newMessage = new Message({ from, to, message });
        await newMessage.save();

        if (clients[to]) {
          clients[to].send(JSON.stringify({ from, message }));
        }
      }
    });

    ws.on("close", () => {
      for (const userId in clients) {
        if (clients[userId] === ws) delete clients[userId];
      }
    });
  });
};
