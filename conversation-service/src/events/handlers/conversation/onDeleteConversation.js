const emitter = require("../../emitter");
const events = require("../../events");
const DynamoDb = require("../../../lib/DynamoDb");

module.exports = async ({ recipient }) => {
  try {
    // Validate the conversation (TODO: break this into its own function)
    await new Promise((resolve, reject) => {
      if (!recipient) {
        reject("A conversation must have a recipient!");
        return;
      }

      resolve();
    });

    const deletedConversation = await DynamoDb.remove(
      // Using the recipient phone number as the primary key (ie +1-123-456-7890 => { id: 1234567890 })
      recipient.slice(1)
    );

    emitter.emit(events.CONVERSATION_DELETED, deletedConversation);
  } catch (e) {
    emitter.emit(events.ERROR, {
      error: e
    });
  }
};
