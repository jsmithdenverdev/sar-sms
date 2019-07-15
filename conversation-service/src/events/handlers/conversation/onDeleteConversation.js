const events = require("../../events");

const onDeleteConversation = ({ emitter, deleteConversation }) => async ({
  recipient
}) => {
  try {
    // Validate the conversation (TODO: break this into its own function)
    await new Promise((resolve, reject) => {
      if (!recipient) {
        reject("An Phone Number is required to delete a conversation!");
        return;
      }

      resolve();
    });

    await deleteConversation(recipient.slice(1));

    emitter.emit(events.CONVERSATION_DELETED, {
      recipient: recipient.slice(1)
    });
  } catch (e) {
    emitter.emit(events.ERROR, {
      error: e
    });
  }
};

module.exports = onDeleteConversation;
