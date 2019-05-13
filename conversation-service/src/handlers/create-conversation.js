const { emitter, events, wireEvents } = require("../events");
const onCreateConversation = require("../events/handlers/conversation/onCreateConversation");
const onConversationCreated = require("../events/handlers/conversation/onConversationCreated");
const onError = require("../events/handlers/error/onError");

module.exports.handle = (event, _context, callback) => {
  const { body } = event;
  const { phone } = JSON.parse(body);

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
