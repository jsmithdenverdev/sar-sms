const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: {
    createConversation: "./src/lambda/create-conversation.js",
    createRecievedSms: "./src/lambda/create-recieved-sms.js",
    createSms: "./src/lambda/create-sms.js",
    deleteConversation: "./src/lambda/delete-conversation.js",
    listConversations: "./src/lambda/list-conversations.js",
    readConversation: "./src/lambda/read-conversation.js",
    updateSmsStatus: "./src/lambda/update-sms-status.js"
  },
  resolve: {
    extensions: [".js", ".json"],
    alias: {
      "@common": path.resolve(__dirname, "src/common"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@handlers": path.resolve(__dirname, "src/handlers"),
      "@lib": path.resolve(__dirname, "src/lib")
    }
  },
  target: "node",
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  externals: [nodeExternals()],
  output: {
    libraryTarget: "commonjs2",
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  }
};
