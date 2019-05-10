const qs = require("querystring");
const { events, emitter, wireEvents } = require('../events');
const onSmsRecieved = require('../events/handlers/sms/onSmsRecieved')
const onError = require('../events/handlers/error/onError');

module.exports.handle = (event, context, callback) => {
  const parsed = qs.parse(event.body);

  wireEvents({
    [events.SMS_RECIEVED]: onSmsRecieved,
    [events.ERROR]: onError(callback)
  })
  
  emitter.emit(events.SMS_RECIEVED, parsed)
};
