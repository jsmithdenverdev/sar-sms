const uuidv1 = require("uuid/v1");
const emitter = require("@common/emitter");
const events = require("@constants/events");
const { addSmsToConversation } = require("@lib/conversation");
const { wireEvents } = require("@lib/events");
const onAddSmsToConversation = require("@handlers/sms/onAddSmsToConversation");
const onSmsAddedToConversation = require("@handlers/sms/onSmsAddedToConversation");

const eventWirer = wireEvents(emtiter)(true);

export const handle = (event, context, callback) => {
  const { pathParameters, body } = event;
  const { id } = pathParameters;
  const { body } = JSON.parse(body);

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
        createUUID: uuidv1
      })
    },
    {
      event: events.SMS_ADDED,
      handler: onSmsAddedToConversation({})
    }
  ]);

  emitter.emit(events.ADD_SMS, payload);
};
