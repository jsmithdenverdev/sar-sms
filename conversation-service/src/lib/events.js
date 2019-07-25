const wireEvents = emitter => clearExisting => eventBindings => {
  if (clearExisting) {
    emitter.removeAllListeners();
  }

  eventBindings.forEach(({ event, handler }) => {
    emitter.on(event, handler);
  });
};

module.exports = {
  wireEvents
};
