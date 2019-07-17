const events = require("@constants/events");

const onCreateConversation = ({ emitter, createConversation }) => async ({
  recipient
}) => {
  try {
    // Validate the conversation (TODO: break this into its own function)
    if (!recipient) {
      throw new Error("A conversation must have a recipient!");
    }

    const conversation = {
      id: recipient.slice(1),
      recipient,
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