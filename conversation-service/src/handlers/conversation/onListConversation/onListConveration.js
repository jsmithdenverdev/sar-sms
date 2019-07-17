const events = require("@constants/events");

const onListConversation = ({
  callback,
  emitter,
  listConversations
}) => async () => {
  try {
    // Get all conversations
    const conversations = await listConversations();

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(conversations),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    });
  } catch (e) {
    emitter.emit(events.ERROR, {
      error: e
    });
  }
};

module.exports = onListConversation;
