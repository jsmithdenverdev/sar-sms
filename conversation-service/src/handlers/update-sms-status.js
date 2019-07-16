const emitter = require("@common/emitter");
const events = require("@constants/events");
const onUpdateSmsStatus = require("@events/handlers/sms/onUpdateSmsStatus");
const onError = require("@events/handlers/error/onError");

module.exports.handle = (event, _context, callback) => {
  const message = JSON.parse(event.Records[0].Sns.Message);
  const { sms, recipient } = message;

  emitter.on(events.UPDATE_SMS_STATUS, onUpdateSmsStatus);
  emitter.on(events.ERROR, onError);

  // Fire off the event to get things rolling
  emitter.emit(events.UPDATE_SMS_STATUS, { sms, recipient });
};
