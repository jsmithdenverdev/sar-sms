const emitter = require("@common/emitter");
const events = require("@constants/events");
const onCreateConversation = require("@handlers/conversation/onCreateConversation");
const onConversationCreated = require("@handlers/conversation/onConversationCreated");
const onError = require("@handlers/error/onError");
const { createConversation } = require("@lib/conversation");
const uuidv1 = require('uuid/v1');

export const handle = (event, _context, callback) => {
  const { pathParameters } = event;
  const { phone } = pathParameters;

  emitter.on(
    events.CREATE_CONVERSATION,
    onCreateConversation({ emitter, createConversation, createUUID: uuidv1 })
  );
  emitter.on(events.CONVERSATION_CREATED, onConversationCreated({ callback }));
  emitter.on(events.ERROR, onError({ callback }));

  const payload = {
    recipient: phone
  };

  emitter.emit(events.CREATE_CONVERSATION, payload);
};
