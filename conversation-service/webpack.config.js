const path = require("path");
const nodeExternals = require("webpack-node-externals");

const entryPoints = [
  { createConversation: "./src/lambda/create-conversation.js" },
  { readConversation: "./src/lambda/read-conversation.js" },
  { deleteConversation: "./src/lambda/delete-conversation.js" },
  { listConversations: "./src/lambda/list-conversations.js" },
  { createNewSms: "./src/lambda/create-new-sms.js" },
  { createRecievedSms: "./src/lambda/create-recieved-sms.js" }
];

const buildAliases = {
  "@common": path.resolve(__dirname, "src/common"),
  "@constants": path.resolve(__dirname, "src/constants"),
  "@handlers": path.resolve(__dirname, "src/handlers"),
  "@lib": path.resolve(__dirname, "src/lib")
};

const buildConfigs = entryPoints.map(entryPoint => ({
  entry: entryPoint,
  resolve: {
    extensions: [".js", ".json"],
    alias: buildAliases
  },
  target: "node",
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  }
}));

module.exports = buildConfigs;
