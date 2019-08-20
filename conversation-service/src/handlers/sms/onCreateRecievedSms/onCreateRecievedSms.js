const events = require("@constants/events");

const onCreateRecievedSms = ({
  emitter,
  addSmsToConversation,
  parsePhoneNumber
}) => async ({ recipient, body }) => {
  try {
    if (!recipient) {
      throw new Error(
        "A recipient is required to add a message to a conversation!"
      );
    }

    if (!body) {
      throw new Error("An SMS message must have a body!");
    }

    const parsedRecipient = parsePhoneNumber(recipient);

    const sms = {
      body,
      recipient: "SYSTEM", // We recieved this sms
      created: new Date(Date.now()).toISOString(),
      modified: new Date(Date.now()).toISOString()
    };

    await addSmsToConversation(sms, parsedRecipient);

    const payload = {
      sms
    };

    emitter.emit(events.RECIEVED_SMS_CREATED, payload);
  } catch (error) {
    emitter.emit(events.ERROR, { error });
  }
};

module.exports = onCreateRecievedSms;
