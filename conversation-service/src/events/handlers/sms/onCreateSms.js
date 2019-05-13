const uuid = require("uuid/v1");
const emitter = require("../../emitter");
const { ERROR, SMS_CREATED } = require("../../events");
const { SMS_STATUSES } = require("../../../constants/conversation");
const DynamoDb = require("../../../lib/DynamoDb");

module.exports = async payload => {
  const { conversationId, body } = payload;

  try {
    await new Promise((resolve, reject) => {
      if (!conversationId) {
        reject("A conversation ID is required to send a message!");
        return;
      }

      resolve();
    });

    const conversation = await DynamoDb.read(conversationId);

    if (!conversation) {
      emitter.emit(ERROR, {
        error: "A conversation for this ID was not found!"
      });

      return;
    }

    const existingSms = conversation.sms || [];
    const newSms = {
      id: uuid(),
      body,
      recipient: conversation.recipient,
      // Once we confirm delivery from Twilio this will be updated to SMS_STATUSES.DELIVERED
      status: SMS_STATUSES.PENDING
    };

    await DynamoDb.update(conversationId, "set sms = :s", {
      ":s": [...existingSms, newSms]
    });

    emitter.emit(SMS_CREATED, { sms: newSms, conversationId });
  } catch (e) {
    emitter.emit(ERROR, {
      error: e
    });
  }
};
