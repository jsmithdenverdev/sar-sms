const events = require("@constants/events");

const onCreateConversation = ({
  emitter,
  createConversation,
  parsePhoneNumber
}) => async ({ recipient }) => {
  try {
    if (!recipient) {
      throw new Error("A conversation must have a recipient!");
    }

    const parsedRecipient = parsePhoneNumber(recipient);

    const conversation = {
      recipient: parsedRecipient,
      sms: [],
      created: new Date(Date.now()).toISOString(),
      modified: new Date(Date.now()).toISOString()
    };

    const createdConversation = await createConversation(conversation);

    emitter.emit(events.CONVERSATION_CREATED, {
      conversation: createdConversation
    });
  } catch (e) {
    emitter.emit(events.ERROR, {
      error: e
    });
  }
};

module.exports = onCreateConversation;
