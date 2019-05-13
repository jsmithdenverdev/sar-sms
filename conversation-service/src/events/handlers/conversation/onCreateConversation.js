const uuid = require('uuid/v1');
const emitter = require("../../emitter");
const events = require("../../events");
const DynamoDb = require("../../../lib/DynamoDb");

module.exports = async payload => {
  const { recipient } = payload;

  try {
    // Validate the conversation (TODO: break this into its own function)
    await new Promise((resolve, reject) => {
      if (!recipient) {
        reject("A conversation must have a recipient!");
        return;
      }

      resolve();
    });

    const payload = await DynamoDb.create(
      uuid(),
      {
        recipient,
        sms: []
      }
    );

    emitter.emit(events.CONVERSATION_CREATED, payload);
  } catch (e) {
    emitter.emit(events.ERROR, {
      error: e
    });
  }
};
