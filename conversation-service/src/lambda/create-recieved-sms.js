const uuidv1 = require("uuid/v1");
const emitter = require("@common/emitter");
const events = require("@constants/events");
const { addSmsToConversation, readConversation } = require("@lib/conversation");
const { wireEvents } = require("@lib/events");
const { publishToQueue } = require("@lib/queue");
const onCreateRecievedSms = require("@handlers/sms/onCreateRecievedSms");
const onRecievedSmsCreated = require("@handlers/sms/onRecievedSmsCreated");
const onError = require("@handlers/error/onError");

const eventWirer = wireEvents(emitter)(true);

module.exports.handle = (event, _context, callback) => {
  const { pathParameters } = event;
  const { id } = pathParameters;
  const { body } = JSON.parse(event.body);

  const payload = {
    conversationId: id,
    body
  };

  eventWirer([
    {
      event: events.CREATE_RECIEVED_SMS,
      handler: onCreateRecievedSms({
        emitter,
        addSmsToConversation,
        readConversation,
        createUUID: uuidv1
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

  emitter.emit(events.CREATE_NEW_SMS, payload);
};
