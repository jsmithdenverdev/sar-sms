const events = require("../../events");

const onCreateConversation = ({ emitter, createConversation }) => async ({
  recipient
}) => {
  try {
    // Validate the conversation (TODO: break this into its own function)
    await new Promise((resolve, reject) => {
      if (!recipient) {
        reject("A conversation must have a recipient!");
        return;
      }

      resolve();
    });

    const conversation = {
      id: recipient.slice(1),
      recipient,
      sms: [],
      created: new Date(Date.now()).toISOString(),
      modified: new Date(Date.now()).toISOString()
    };

    await createConversation(conversation);

    emitter.emit(events.CONVERSATION_CREATED, {
      conversation
    });
  } catch (e) {
    emitter.emit(events.ERROR, {
      error: e
    });
  }
};

module.exports = onCreateConversation;
