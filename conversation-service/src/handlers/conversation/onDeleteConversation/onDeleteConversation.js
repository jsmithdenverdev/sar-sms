const events = require("@constants/events");

const onDeleteConversation = ({
  emitter,
  deleteConversation,
  parsePhoneNumber
}) => async ({ recipient }) => {
  try {
    if (!recipient) {
      throw new Error("You must provide a recipient!");
    }

    const parsedRecipient = parsePhoneNumber(recipient);
    await deleteConversation(parsedRecipient);

    emitter.emit(events.CONVERSATION_DELETED, {
      recipient: parsedRecipient
    });
  } catch (e) {
    emitter.emit(events.ERROR, {
      error: e
    });
  }
};

module.exports = onDeleteConversation;
