const { emitter, events, wireEvents } = require("../events");
const onListConveration = require('../events/handlers/conversation/onListConveration');
const onError = require('../events/handlers/error/onError');

module.exports.handle = (_event, _context, callback) => {
  wireEvents({
    [events.LIST_CONVERSATION]: onListConveration(callback),
    [events.ERROR]: onError(callback)
  });

  // Fire off the event to get things rolling
  emitter.emit(events.LIST_CONVERSATION);
};
