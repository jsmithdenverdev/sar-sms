const emitter = require("@common/emitter");
const events = require("@constants/events");

const onConversationCreated = ({ callback }) => ({ conversation }) => {
  try {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(conversation),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    emitter.emit(events.ERROR, { error });
  }
};

module.exports = onConversationCreated;
