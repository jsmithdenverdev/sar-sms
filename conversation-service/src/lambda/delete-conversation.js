const emitter = require("@common/emitter");
const events = require("@constants/events");
const onDeleteConversation = require("@handlers/conversation/onDeleteConversation");
const onConversationDeleted = require("@handlers/conversation/onConversationDeleted");
const onError = require("@handlers/error/onError");
const { deleteConversation } = require("@lib/conversation");
const { wireEvents } = require("@lib/events");
const { parsePhoneNumber } = require("@lib/phone");

const eventWirer = wireEvents(emitter)(true);

module.exports.handle = (event, _context, callback) => {
  const { pathParameters } = event;
  const { recipient } = pathParameters;
  const decodedRecipient = decodeURI(recipient);

  eventWirer([
    {
      event: events.DELETE_CONVERSATION,
      handler: onDeleteConversation({
        emitter,
        deleteConversation,
        parsePhoneNumber
      })
    },
    {
      event: events.CONVERSATION_DELETED,
      handler: onConversationDeleted({ callback })
    },
    {
      event: events.ERROR,
      handler: onError({ callback })
    }
  ]);

  const payload = {
    recipient: decodedRecipient
  };

  emitter.emit(events.DELETE_CONVERSATION, payload);
};
