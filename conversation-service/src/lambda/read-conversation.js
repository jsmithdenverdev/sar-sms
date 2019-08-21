const emitter = require("@common/emitter");
const events = require("@constants/events");
const onReadConversation = require("@handlers/conversation/onReadConversation");
const onError = require("@handlers/error/onError");
const { readConversation } = require("@lib/conversation");
const { wireEvents } = require("@lib/events");
const { parsePhoneNumber } = require("@lib/phone");

const eventWirer = wireEvents(emitter)(true);

module.exports.handle = (event, _context, callback) => {
  const { pathParameters } = event;
  const { recipient } = pathParameters;
  const decodedRecipient = decodeURI(recipient);

  eventWirer([
    {
      event: events.READ_CONVERSATION,
      handler: onReadConversation({
        emitter,
        callback,
        readConversation,
        parsePhoneNumber
      })
    },
    {
      event: events.ERROR,
      handler: onError({ callback })
    }
  ]);

  const payload = {
    recipient: decodedRecipient
  };

  // Fire off the event to get things rolling
  emitter.emit(events.READ_CONVERSATION, payload);
};
