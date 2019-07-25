const events = require("@constants/events");

const onDeleteConversation = ({ emitter, deleteConversation }) => async ({
  id
}) => {
  try {
    if (!id) {
      throw new Error("You must provide an id!");
    }

    await deleteConversation(id);

    emitter.emit(events.CONVERSATION_DELETED, {
      id
    });
  } catch (e) {
    emitter.emit(events.ERROR, {
      error: e
    });
  }
};

module.exports = onDeleteConversation;
