const emitter = require("../../emitter");
const events = require("../../events");
const DynamoDb = require("../../../lib/DynamoDb");

module.exports = async payload => {
  const { conversationId } = payload;

  try {
    // Validate the conversation (TODO: break this into its own function)
    await new Promise((resolve, reject) => {
      if (!conversationId) {
        reject("An ID is required to delete a conversation!");
        return;
      }

      resolve();
    });

    await DynamoDb.remove(conversationId);

    const payload = {
      conversationId
    };

    emitter.emit(events.CONVERSATION_DELETED, payload);
  } catch (e) {
    emitter.emit(events.ERROR, {
      error: e
    });
  }
};
