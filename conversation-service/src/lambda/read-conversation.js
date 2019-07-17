const emitter = require("@common/emitter");
const events = require("@constants/events");
const onReadConversation = require("@events/handlers/conversation/onReadConversation");
const onError = require("@events/handlers/error/onError");

module.exports.handle = (event, _context, callback) => {
  const { pathParameters } = event;
  const { phone } = pathParameters;

  emitter.on(events.READ_CONVERSATION, onReadConversation);
  emitter.on(events.ERROR, onError);

  const payload = {
    recipient: phone
  };

  // Fire off the event to get things rolling
  emitter.emit(events.READ_CONVERSATION, payload);
};
