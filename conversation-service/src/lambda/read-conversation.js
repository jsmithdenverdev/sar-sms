const emitter = require("@common/emitter");
const events = require("@constants/events");
const onReadConversation = require("@handlers/conversation/onReadConversation");
const onError = require("@handlers/error/onError");
const { readConversation } = require("@lib/conversation");
const { wireEvents } = require("@lib/events");

const eventWirer = wireEvents(emitter)(true);

module.exports.handle = (event, _context, callback) => {
  const { pathParameters } = event;
  const { id } = pathParameters;

  eventWirer([
    {
      event: events.READ_CONVERSATION,
      handler: onReadConversation({ emitter, callback, readConversation })
    },
    {
      event: events.ERROR,
      handler: onError({ callback })
    }
  ]);

  const payload = {
    id
  };

  // Fire off the event to get things rolling
  emitter.emit(events.READ_CONVERSATION, payload);
};
