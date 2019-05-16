const events = require("../../events");
const emitter = require("../../emitter");
const { SMS_STATUSES } = require("../../../constants/conversation");
const DynamoDb = require("../../../lib/DynamoDb");

module.exports = async ({ sms, recipient }) => {
  try {
    const conversation = await DynamoDb.read(recipient.slice(1));

    if (!conversation) {
      emitter.emit(events.ERROR, {
        error: "A conversation for this ID was not found!"
      });
    }

    const index = conversation.sms.findIndex(item => item.id === sms.id);
    const before = conversation.sms.slice(0, index);
    const after = conversation.sms.slice(index + 1, conversation.sms.length);

    const updatedSms = {
      ...sms,
      status: SMS_STATUSES.SENT,
      modified: new Date(Date.now()).toISOString()
    };

    const newSmsCollection = [...before, updatedSms, ...after];

    await DynamoDb.update(recipient.slice(1), "set sms = :s", {
      ":s": newSmsCollection
    });
  } catch (e) {
    emitter.emit(events.ERROR, {
      error: e
    });
  }
};
