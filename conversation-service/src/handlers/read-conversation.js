const { emitter, events, wireEvents } = require("../events");
const onReadConversation = require("../events/handlers/conversation/onReadConversation");
const onError = require("../events/handlers/error/onError");

module.exports.handle = (event, _context, callback) => {
  const { pathParameters } = event;
  const { phone } = pathParameters;

  wireEvents({
    [events.READ_CONVERSATION]: onReadConversation(callback),
    [events.ERROR]: onError(callback)
  });

  const payload = {
    recipient: phone
  };

  // Fire off the event to get things rolling
  emitter.emit(events.READ_CONVERSATION, payload);
};
