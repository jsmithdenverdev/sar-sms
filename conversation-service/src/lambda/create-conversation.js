const emitter = require("@common/emitter");
const events = require("@constants/events");
const onCreateConversation = require("@handlers/conversation/onCreateConversation");
const onConversationCreated = require("@handlers/conversation/onConversationCreated");
const onError = require("@handlers/error/onError");
const { createConversation } = require("@lib/conversation");
const { wireEvents } = require("@lib/events");
const { parsePhoneNumber } = require("@lib/phone");

const eventWirer = wireEvents(emitter)(true);

module.exports.handle = (event, _context, callback) => {
  eventWirer([
    {
      event: events.CREATE_CONVERSATION,
      handler: onCreateConversation({
        emitter,
        createConversation,
        parsePhoneNumber
      })
    },
    {
      event: events.CONVERSATION_CREATED,
      handler: onConversationCreated({ callback })
    },
    {
      event: events.ERROR,
      handler: onError({ callback })
    }
  ]);

  const { queryStringParameters } = event;
  const { recipient } = queryStringParameters;
  const decodedRecipient = decodeURI(recipient);

  const payload = {
    recipient: decodedRecipient
  };

  emitter.emit(events.CREATE_CONVERSATION, payload);
};
