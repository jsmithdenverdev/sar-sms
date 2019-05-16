const uuid = require("uuid/v1");
const emitter = require("../../emitter");
const { ERROR, SMS_CREATED } = require("../../events");
const { SMS_STATUSES } = require("../../../constants/conversation");
const DynamoDb = require("../../../lib/DynamoDb");

module.exports = async ({ recipient, body, recieved }) => {
  try {
    const conversation = await DynamoDb.read(recipient.slice(1));

    if (!conversation) {
      emitter.emit(ERROR, {
        error: "A conversation for this phone number was not found!"
      });

      return;
    }

    const existingSms = conversation.sms;

    const newSms = {
      id: uuid(),
      body,
      status: recieved ? SMS_STATUSES.RECIEVED : SMS_STATUSES.PENDING,
      created: new Date(Date.now()).toISOString(),
      modified: new Date(Date.now()).toISOString()
    };

    await DynamoDb.update(recipient.slice(1), "set sms = :s, modified = :m", {
      ":s": [...existingSms, newSms],
      ":m": new Date(Date.now()).toISOString()
    });

    if (!recieved) {
      emitter.emit(SMS_CREATED, { sms: newSms, recipient });
    }
  } catch (e) {
    emitter.emit(ERROR, {
      error: e
    });
  }
};
