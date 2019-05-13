const emitter = require("../../emitter");
const { ERROR, MESSAGE_CREATED } = require("../../events");
const { MESSAGE_STATUSES } = require("../../../constants/conversation");
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

    const id = recipient.slice(1);
    const conversation = await DynamoDb.read(id);

    if (!conversation) {
      emitter.emit(ERROR, {
        error: "A conversation for this number was not found!"
      });

      return;
    }

    const existingMessages = conversation.messages || [];
    const newMessage = {
      message,
      // Once we confirm delivery from Twilio this will be updated to MESSAGES_STATUSES.DELIVERED
      status: MESSAGE_STATUSES.PENDING
    };

    await DynamoDb.update(
      // Using the recipient phone number as the primary key (ie +1-123-456-7890 => { id: 1234567890 })
      id,
      "set messages = :m",
      {
        ":m": [
          ...existingMessages,
          newMessage
        ]
      }
    );

    emitter.emit(MESSAGE_CREATED, { recipient, message });
  } catch (e) {
    emitter.emit(ERROR, {
      error: e
    });
  }
};
