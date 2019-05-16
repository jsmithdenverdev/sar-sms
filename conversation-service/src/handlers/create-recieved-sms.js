const { emitter, events, wireEvents } = require("../events");
const onCreateSms = require("../events/handlers/sms/onCreateSms");
const onError = require("../events/handlers/error/onError");

module.exports.handle = (event, _context, callback) => {
  const message = JSON.parse(event.Records[0].Sns.Message);
  const { body, recipient } = message;

  wireEvents({
    [events.CREATE_SMS]: onCreateSms,
    [events.ERROR]: onError(callback)
  });

  emitter.emit(events.CREATE_SMS, {
    recipient,
    body,
    recieved: true
  });
};
