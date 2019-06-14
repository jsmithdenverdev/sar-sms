const uuid = require("uuid/v1");
const emitter = require("../../emitter");
const events = require("../../../common/events");
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

    const conversation = await DynamoDb.create(recipient.slice(1), {
      recipient,
      sms: [],
      created: new Date(Date.now()).toISOString(),
      modified: new Date(Date.now()).toISOString()
    });

    emitter.emit(events.CONVERSATION_CREATED, {
      conversation
    });
  } catch (e) {
    emitter.emit(events.ERROR, {
      error: e
    });
  }
};
