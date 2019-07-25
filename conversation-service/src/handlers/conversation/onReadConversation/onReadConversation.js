const events = require("@constants/events");

const onReadConversation = ({ callback, emitter, readConversation }) => async ({
  id
}) => {
  try {
    const conversation = await readConversation(id);

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(conversation),
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

module.exports = onReadConversation;
