const emitter = require("./emitter");
const events = require("./events");

module.exports = {
  emitter,
  events,
  wireEvents(events, removeExisting = true) {
    // To ensure we don't have duplicate events defined
    if (removeExisting) {
      emitter.removeAllListeners();
    }

    Object.keys(events).forEach(event => {
      emitter.on(event, events[event]);
    });
  }
};
