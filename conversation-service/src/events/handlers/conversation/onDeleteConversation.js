const emitter = require("../../emitter");
const events = require("../../../common/events");
const DynamoDb = require("../../../lib/DynamoDb");

module.exports = async ({ recipient }) => {
  try {
    // Validate the conversation (TODO: break this into its own function)
    await new Promise((resolve, reject) => {
      if (!recipient) {
        reject("An Phone Number is required to delete a conversation!");
        return;
      }

      resolve();
    });

    await DynamoDb.remove(recipient.slice(1));

    emitter.emit(events.CONVERSATION_DELETED, {
      recipient: recipient.slice(1)
    });
  } catch (e) {
    emitter.emit(events.ERROR, {
      error: e
    });
  }
};
