const emitter = require("@common/emitter");
const events = require("@constants/events");
const onCreateConversation = require("@events/handlers/conversation/onCreateConversation");
const onConversationCreated = require("@events/handlers/conversation/onConversationCreated");
const onError = require("@events/handlers/error/onError");
const { createConversation } = require("@lib/conversation");

export const handle = (event, _context, callback) => {
  const { pathParameters } = event;
  const { phone } = pathParameters;

  emitter.on(
    events.CREATE_CONVERSATION,
    onCreateConversation({ emitter, createConversation })
  );
  emitter.on(events.CONVERSATION_CREATED, onConversationCreated({ callback }));
  emitter.on(events.ERROR, onError({ callback }));

  const payload = {
    recipient: phone
  };

  emitter.emit(events.CREATE_CONVERSATION, payload);
};
