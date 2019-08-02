const { events, emitter, wireEvents } = require("../events");
const onSendSms = require("../events/handlers/sms/onSendSms");
const onSmsSent = require("../events/handlers/sms/onSmsSent");
const onError = require("../events/handlers/error/onError");

module.exports.handle = (event, _context, callback) => {
  const { sms } = JSON.parse(event.Records[0].Sns.Message);

  // This wires the events to their handlers
  wireEvents({
    [events.SEND_SMS]: onSendSms,
    [events.SMS_SENT]: onSmsSent,
    [events.ERROR]: onError(callback)
  });

  emitter.emit(events.SEND_SMS, {
    sms
  });
};
