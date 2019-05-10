const emitter = require("../../emitter");
const events = require("../../events");
const DynamoDb = require("../../../lib/DynamoDb");

module.exports = async ({ recipient, message }) => {
  try {
    await new Promise((resolve, reject) => {
      if (!recipient) {
        reject("A message must have a recpient");
        return;
      }

      resolve();
    });

    const client = DynamoDb({
      table: process.env.DYNAMODB_TABLE,
      region: process.env.REGION
    });

    const id = recipient.slice(1);
    const conversation = await client.read(id);

    if (!conversation) {
      emitter.emit(events.ERROR, {
        error: "A conversation for this number was not found!"
      });

      return;
    }

    const existingMessages = conversation.messages || [];

    await client.update(
      // Using the recipient phone number as the primary key (ie +1-123-456-7890 => { id: 1234567890 })
      id,
      "set messages = :m",
      {
        ":m": [existingMessages, { message }]
      }
    );

    emitter.emit(events.MESSAGE_CREATED, { recipient, message });
  } catch (e) {
    emitter.emit(events.ERROR, {
      error: e
    });
  }
};
