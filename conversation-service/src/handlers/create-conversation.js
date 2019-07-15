const { emitter, events, wireEvents } = require("../events");
const onCreateConversation = require("../events/handlers/conversation/onCreateConversation");
const onConversationCreated = require("../events/handlers/conversation/onConversationCreated");
const onError = require("../events/handlers/error/onError");

export const handle = (event, _context, callback) => {
  const { pathParameters } = event;
  const { phone } = pathParameters;

  wireEvents({
    [events.CREATE_CONVERSATION]: onCreateConversation,
    [events.CONVERSATION_CREATED]: onConversationCreated(callback),
    [events.ERROR]: onError(callback)
  });

  const payload = {
    recipient: phone
  };

  emitter.emit(events.CREATE_CONVERSATION, payload);
};
