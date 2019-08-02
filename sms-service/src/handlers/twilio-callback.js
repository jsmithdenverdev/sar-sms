const qs = require("querystring");
const { events, emitter, wireEvents } = require("../events");
const onSmsRecieved = require("../events/handlers/sms/onSmsRecieved");
const onError = require("../events/handlers/error/onError");

module.exports.handle = (event, _context, callback) => {
  const parsed = qs.parse(event.body);
  const { Body, From } = parsed;

  wireEvents({
    [events.SMS_RECIEVED]: onSmsRecieved(callback),
    [events.ERROR]: onError(callback)
  });

  emitter.emit(events.SMS_RECIEVED, {
    body: Body,
    phone: From
  });
};
