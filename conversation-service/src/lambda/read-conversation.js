const emitter = require("@common/emitter");
const events = require("@constants/events");
const onReadConversation = require("@handlers/conversation/onReadConversation");
const onError = require("@handlers/error/onError");
const { readConversation } = require("@lib/conversation");

module.exports.handle = (event, _context, callback) => {
  const { pathParameters } = event;
  const { id } = pathParameters;

  emitter.on(
    events.READ_CONVERSATION,
    onReadConversation({ emitter, callback, readConversation })
  );
  emitter.on(events.ERROR, onError({ callback }));

  const payload = {
    id
  };

  // Fire off the event to get things rolling
  emitter.emit(events.READ_CONVERSATION, payload);
};
