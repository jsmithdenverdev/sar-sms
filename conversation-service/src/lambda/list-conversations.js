const emitter = require("@common/emitter");
const events = require("@constants/events");
const onListConveration = require("@events/handlers/conversation/onListConversation");
const onError = require("@events/handlers/error/onError");
const { listConversations } = require("@lib/conversation");

module.exports.handle = (_event, _context, callback) => {
  emitter.on(
    events.LIST_CONVERSATION,
    onListConveration({ callback, emitter, listConversations })
  );
  emitter.on(events.ERROR, onError({ callback }));

  // Fire off the event to get things rolling
  emitter.emit(events.LIST_CONVERSATION);
};
