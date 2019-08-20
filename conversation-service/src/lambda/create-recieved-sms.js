const emitter = require("@common/emitter");
const events = require("@constants/events");
const {
  addSmsToConversation,
  readConversationByPhone
} = require("@lib/conversation");
const { wireEvents } = require("@lib/events");
const { parsePhoneNumber } = require("@lib/phone");
const onCreateRecievedSms = require("@handlers/sms/onCreateRecievedSms");
const onRecievedSmsCreated = require("@handlers/sms/onRecievedSmsCreated");
const onError = require("@handlers/error/onError");

const eventWirer = wireEvents(emitter)(true);

module.exports.handle = (event, _context, callback) => {
  const { body, recipient } = JSON.parse(event.Records[0].Sns.Message);

  const payload = {
    body,
    recipient
  };

  eventWirer([
    {
      event: events.CREATE_RECIEVED_SMS,
      handler: onCreateRecievedSms({
        emitter,
        addSmsToConversation,
        readConversationByPhone,
        parsePhoneNumber
      })
    },
    {
      event: events.RECIEVED_SMS_CREATED,
      handler: onRecievedSmsCreated({ emitter, callback })
    },
    {
      event: events.ERROR,
      handler: onError({ callback })
    }
  ]);

  emitter.emit(events.CREATE_RECIEVED_SMS, payload);
};
