const { emitter, events, wireEvents } = require("../events");
const onCreateMessage = require("../events/handlers/message/onCreateMessage");
const onMessageCreated = require("../events/handlers/message/onMessageCreated");
const onError = require("../events/handlers/error/onError");

module.exports.handle = (event, _context, callback) => {
  const { body, pathParameters } = event;
  const { phone } = pathParameters;
  const { message } = JSON.parse(body);

  wireEvents({
    [events.CREATE_MESSAGE]: onCreateMessage,
    [events.MESSAGE_CREATED]: onMessageCreated(callback),
    [events.ERROR]: onError(callback)
  });

  // TODO: Allow sending media
  emitter.emit(events.CREATE_MESSAGE, { recipient: phone, message });
};
