const emitter = require("./emitter");

module.exports = events => {
  emitter.removeAllListeners();

  const eventNames = Object.keys(events);
  const eventsLength = eventNames.length;

  for (let i = 0; i < eventsLength; i += 1) {
    const eventName = eventNames[i];
    emitter.on(eventName, events[eventName]);
  }
};
