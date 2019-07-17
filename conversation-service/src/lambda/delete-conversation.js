const emitter = require("@common/emitter");
const events = require("@constants/events");
const onDeleteConversation = require("@events/handlers/conversation/onDeleteConversation");
const onConversationDeleted = require("@events/handlers/conversation/onConversationDeleted");
const onError = require("@events/handlers/error/onError");

module.exports.handle = (event, _context, callback) => {
  const { pathParameters } = event;
  const { phone } = pathParameters;

  emitter.on(events.DELETE_CONVERSATION, onDeleteConversation);
  emitter.on(events.CONVERSATION_DELETED, onConversationDeleted);
  emitter.on(events.ERROR, onError);

  const payload = {
    recipient: phone
  };

  emitter.emit(events.DELETE_CONVERSATION, payload);
};
