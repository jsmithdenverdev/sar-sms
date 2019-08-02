const events = require("@constants/events");

const onCreateNewSms = ({
  emitter,
  addSmsToConversation,
  readConversation,
  createUUID
}) => async ({ conversationId, body }) => {
  try {
    if (!body) {
      throw new Error("An SMS message must have a body!");
    }

    if (!conversationId) {
      throw new Error("A conversation id is required to add an SMS message!");
    }

    const conversation = await readConversation(conversationId);
    const { recipient } = conversation;

    if (!conversation) {
      throw new Error("A conversation was not found for this id!");
    }

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

    emitter.emit(events.NEW_SMS_CREATED, payload);
  } catch (error) {
    emitter.emit(events.ERROR, { error });
  }
};

module.exports = onCreateNewSms;
