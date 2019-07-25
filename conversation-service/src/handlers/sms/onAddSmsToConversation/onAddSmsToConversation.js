const events = require("@constants/events");

const onAddSmsToConversation = ({
  emitter,
  addSmsToConversation,
  createUUID
}) => async ({ conversationId, body }) => {
  try {
    if (!body) {
      throw new Error("An SMS message must have a body!");
    }

    if (!conversationId) {
      throw new Error("A conversation id is required to add an SMS message!");
    }

    const sms = {
      id: createUUID(),
      body,
      created: new Date(Date.now()).toISOString(),
      modified: new Date(Date.now()).toISOString()
    };

    await addSmsToConversation(sms, conversationId);

    const payload = {
      sms
    };

    emitter.emit(events.SMS_ADDED, payload);
  } catch (e) {
    emitter.emit(events.ERROR, e);
  }
};

module.exports = onAddSmsToConversation;
