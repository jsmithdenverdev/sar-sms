const emitter = require("@common/emitter");
const events = require("@constants/events");
const onCreateSms = require("@events/handlers/sms/onCreateSms");
const onError = require("@events/handlers/error/onError");

module.exports.handle = (event, _context, callback) => {
  const message = JSON.parse(event.Records[0].Sns.Message);
  const { body, recipient } = message;

  emitter.on(events.CREATE_SMS, onCreateSms);
  emitter.on(events.ERROR, onError);

  emitter.emit(events.CREATE_SMS, {
    recipient,
    body,
    recieved: true
  });
};
