const events = require("@constants/events");

const onDeleteConversation = ({ emitter, deleteConversation }) => async ({
  recipient
}) => {
  try {
    if (!recipient) {
      throw new Error("You must provide a recipient!");
    }

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
