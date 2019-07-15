const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: {
    createConversation: "./src/handlers/create-conversation.js",
    createRecievedSms: "./src/handlers/create-recieved-sms.js",
    createSms: "./src/handlers/create-sms.js",
    deleteConversation: "./src/handlers/delete-conversation.js",
    listConversations: "./src/handlers/list-conversations.js",
    readConversation: "./src/handlers/read-conversation.js",
    updateSmsStatus: "./src/handlers/update-sms-status.js"
  },
  resolve: {
    extensions: [".js", ".json"]
  },
  target: "node",
  mode: process.env.NODE_ENV,
  externals: [nodeExternals()],
  output: {
    libraryTarget: "commonjs2",
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  }
};
