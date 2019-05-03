const { events, emitter, wireEvents } = require("../events");
const sendSms = require("../events/subscribers/send-sms");
const publishOutboundSmsToSns = require("../events/subscribers/publish-outbound-sms-to-sns");
const handleError = require("../events/subscribers/handle-error");
const handleSuccess = require("../events/subscribers/handle-success");

module.exports.handle = (event, context, callback) => {
  const { body, pathParameters } = event;
  const { message } = JSON.parse(body);
  const { phone } = pathParameters;

  const successHandler = handleSuccess(callback);
  const errorHandler = handleError(callback);

  // This wires the events to their subscriptions
  wireEvents({
    [events.SMS_REQUEST_RECIEVED]: sendSms,
    [events.SMS_SENT]: publishOutboundSmsToSns,
    [events.ERROR]: errorHandler,
    [events.PROCESSING_COMPLETED]: successHandler
  });

  emitter.emit(events.SMS_REQUEST_RECIEVED, {
    to: phone,
    body: message
  });
};
