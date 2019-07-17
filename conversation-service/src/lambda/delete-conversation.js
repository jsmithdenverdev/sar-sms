const emitter = require("@common/emitter");
const events = require("@constants/events");
const onDeleteConversation = require("@handlers/conversation/onDeleteConversation");
const onConversationDeleted = require("@handlers/conversation/onConversationDeleted");
const onError = require("@handlers/error/onError");
const { deleteConversation } = require("@lib/conversation");

module.exports.handle = (event, _context, callback) => {
  const { pathParameters } = event;
  const { phone } = pathParameters;

  emitter.on(
    events.DELETE_CONVERSATION,
    onDeleteConversation({ emitter, deleteConversation })
  );
  emitter.on(events.CONVERSATION_DELETED, onConversationDeleted({ callback }));
  emitter.on(events.ERROR, onError({ callback }));

  const payload = {
    recipient: phone
  };

  emitter.emit(events.DELETE_CONVERSATION, payload);
};
