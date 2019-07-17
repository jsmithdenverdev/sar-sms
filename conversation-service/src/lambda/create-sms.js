const emitter = require("@common/emitter");
const events = require("@constants/events");
const onCreateSms = require("@handlers/sms/onCreateSms");
const onSmsCreated = require("@handlers/sms/onSmsCreated");
const onError = require("@handlers/error/onError");

module.exports.handle = (event, _context, callback) => {
  const { pathParameters } = event;
  const { phone } = pathParameters;
  const { body } = JSON.parse(event.body);

  emitter.on(events.CREATE_SMS, onCreateSms);
  emitter.on(events.SMS_CREATED, onSmsCreated);
  emitter.on(events.ERROR, onError);

  // TODO: Allow sending media
  const payload = {
    recipient: phone,
    body
  };

  emitter.emit(events.CREATE_SMS, payload);
};
