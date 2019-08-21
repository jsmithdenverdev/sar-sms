const emitter = require("@common/emitter");
const events = require("@constants/events");
const { addSmsToConversation, readConversation } = require("@lib/conversation");
const { wireEvents } = require("@lib/events");
const { publishToQueue } = require("@lib/queue");
const { parsePhoneNumber } = require("@lib/phone");
const onCreateNewSms = require("@handlers/sms/onCreateNewSms");
const onNewSmsCreated = require("@handlers/sms/onNewSmsCreated");
const onError = require("@handlers/error/onError");

const eventWirer = wireEvents(emitter)(true);

module.exports.handle = (event, _context, callback) => {
  const { pathParameters } = event;
  const { recipient } = pathParameters;
  const { body } = JSON.parse(event.body);

  const decodedRecipient = decodeURI(recipient);

  const payload = {
    recipient: decodedRecipient,
    body
  };

  eventWirer([
    {
      event: events.CREATE_NEW_SMS,
      handler: onCreateNewSms({
        emitter,
        addSmsToConversation,
        readConversation,
        parsePhoneNumber
      })
    },
    {
      event: events.NEW_SMS_CREATED,
      handler: onNewSmsCreated({ emitter, publishToQueue, callback })
    },
    {
      event: events.ERROR,
      handler: onError({ callback })
    }
  ]);

  emitter.emit(events.CREATE_NEW_SMS, payload);
};
