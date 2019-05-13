const { emitter, events, wireEvents } = require("../events");
const onDeleteConversation = require("../events/handlers/conversation/onDeleteConversation");
const onConversationDeleted = require("../events/handlers/conversation/onConversationDeleted");
const onError = require("../events/handlers/error/onError");

module.exports.handle = (event, _context, callback) => {
  const { pathParameters } = event;
  const { conversationId } = pathParameters;

  wireEvents({
    [events.DELETE_CONVERSATION]: onDeleteConversation,
    [events.CONVERSATION_DELETED]: onConversationDeleted(callback),
    [events.ERROR]: onError(callback)
  });

  const payload = {
    conversationId
  };

  emitter.emit(events.DELETE_CONVERSATION, payload);
};
