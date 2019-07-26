const uuidv1 = require("uuid/v1");
const emitter = require("@common/emitter");
const events = require("@constants/events");
const { addSmsToConversation, readConversation } = require("@lib/conversation");
const { wireEvents } = require("@lib/events");
const { publishToQueue } = require("@lib/queue");
const onAddSmsToConversation = require("@handlers/sms/onAddSmsToConversation");
const onSmsAddedToConversation = require("@handlers/sms/onSmsAddedToConversation");
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
      event: events.ADD_SMS,
      handler: onAddSmsToConversation({
        emitter,
        addSmsToConversation,
        readConversation,
        createUUID: uuidv1
      })
    },
    {
      event: events.SMS_ADDED,
      handler: onSmsAddedToConversation({ emitter, publishToQueue, callback })
    },
    {
      event: events.ERROR,
      handler: onError({ callback })
    }
  ]);

  emitter.emit(events.ADD_SMS, payload);
};
