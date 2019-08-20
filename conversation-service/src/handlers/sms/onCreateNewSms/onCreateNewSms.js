const events = require("@constants/events");

const onCreateNewSms = ({
  emitter,
  addSmsToConversation,
  readConversation,
  parsePhoneNumber
}) => async ({ recipient, body }) => {
  try {
    if (!body) {
      throw new Error("An SMS message must have a body!");
    }

    if (!recipient) {
      throw new Error("A recipient is required to send an SMS message!");
    }

    const parsedRecipient = parsePhoneNumber(recipient);
    const conversation = await readConversation(parsedRecipient);

    if (!conversation) {
      throw new Error("A conversation was not found for this id!");
    }

    const sms = {
      body,
      recipient: parsedRecipient,
      created: new Date(Date.now()).toISOString(),
      modified: new Date(Date.now()).toISOString()
    };

    await addSmsToConversation(sms, parsedRecipient);

    const payload = {
      sms
    };

    emitter.emit(events.NEW_SMS_CREATED, payload);
  } catch (error) {
    emitter.emit(events.ERROR, { error });
  }
};

module.exports = onCreateNewSms;
