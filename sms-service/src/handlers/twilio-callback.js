const qs = require("querystring");
const { events, emitter, wireEvents } = require('../events');
const handleError = require('../events/subscribers/handle-error');
const sendSmsCallback = require('../events/subscribers/send-sms-callback');
const publishInboundSmsToSns = require('../events/subscribers/publish-inbound-sms-to-sns');

module.exports.handle = (event, context, callback) => {
  const parsed = qs.parse(event.body);

  const errorHandler = handleError(callback);

  wireEvents({
    [events.SMS_RECIEVED]: publishInboundSmsToSns,
    [events.PROCESSING_COMPLETED]: sendSmsCallback(callback),
    [events.ERROR]: errorHandler
  })
  
  emitter.emit(events.SMS_RECIEVED, parsed)
};
