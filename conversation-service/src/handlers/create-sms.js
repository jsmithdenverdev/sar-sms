const { emitter, events, wireEvents } = require("../events");
const onCreateSms = require("../events/handlers/sms/onCreateSms");
const onSmsCreated = require("../events/handlers/sms/onSmsCreated");
const onError = require("../events/handlers/error/onError");

module.exports.handle = (event, _context, callback) => {
  const { pathParameters } = event;
  const { conversationId } = pathParameters;
  const { body } = JSON.parse(event.body);

  wireEvents({
    [events.CREATE_SMS]: onCreateSms,
    [events.SMS_CREATED]: onSmsCreated(callback),
    [events.ERROR]: onError(callback)
  });

  // TODO: Allow sending media
  const payload = {
    conversationId,
    body
  };

  emitter.emit(events.CREATE_SMS, payload);
};
