const events = require("@constants/events");

const onCreateRecievedSms = ({
  emitter,
  addSmsToConversation,
  readConversationByPhone,
  createUUID
}) => async ({ phone, body }) => {
  try {
    if (!body) {
      throw new Error("An SMS message must have a body!");
    }

    if (!phone) {
      throw new Error("A phone number is required to add a message to a conversation!");
    }

    const conversation = await readConversationByPhone(phone);

    if (!conversation) {
      throw new Error("A conversation was not found for this id!");
    }

    const { id: conversationId, recipient } = conversation;

    const sms = {
      id: createUUID(),
      body,
      recipient,
      created: new Date(Date.now()).toISOString(),
      modified: new Date(Date.now()).toISOString()
    };

    await addSmsToConversation(sms, conversationId);

    const payload = {
      sms
    };

    emitter.emit(events.RECIEVED_SMS_CREATED, payload);
  } catch (error) {
    emitter.emit(events.ERROR, { error });
  }
};

module.exports = onCreateRecievedSms;
