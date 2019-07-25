const emitter = require("@common/emitter");
const events = require("@constants/events");
const onListConveration = require("@handlers/conversation/onListConversation");
const onError = require("@handlers/error/onError");
const { listConversations } = require("@lib/conversation");
const { wireEvents } = require("@lib/events");

const eventWirer = wireEvents(emitter)(true);

module.exports.handle = (_event, _context, callback) => {
  eventWirer([
    {
      event: events.LIST_CONVERSATION,
      handler: onListConveration({ callback, emitter, listConversations })
    },
    {
      event: events.ERROR,
      handler: onError({ callback })
    }
  ]);

  // Fire off the event to get things rolling
  emitter.emit(events.LIST_CONVERSATION);
};
