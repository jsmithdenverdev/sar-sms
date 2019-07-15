const events = require("../../events");

const onReadConversation = ({ callback, emitter, readConversation }) => async ({
  recipient
}) => {
  try {
    const conversation = await readConversation(recipient.slice(1));

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
