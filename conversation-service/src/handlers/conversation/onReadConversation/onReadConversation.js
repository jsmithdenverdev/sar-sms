const events = require("@constants/events");

const onReadConversation = ({
  callback,
  emitter,
  readConversation,
  parsePhoneNumber
}) => async ({ recipient }) => {
  try {
    if (!recipient) {
      throw new Error("A recipient is required to load a conversation!");
    }

    const parsedRecipient = parsePhoneNumber(recipient);
    const conversation = await readConversation(parsedRecipient);

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
