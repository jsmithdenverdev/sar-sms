import { emitter, events, wireEvents } from "../events";
import onCreateConversation from "../events/handlers/conversation/onCreateConversation";
import onConversationCreated from "../events/handlers/conversation/onConversationCreated";
import onError from "../events/handlers/error/onError";

export const handle = (event: any, _context: any, callback: any) => {
  const { pathParameters } = event;
  const { phone } = pathParameters;

  wireEvents({
    [events.CREATE_CONVERSATION]: onCreateConversation,
    [events.CONVERSATION_CREATED]: onConversationCreated(callback),
    [events.ERROR]: onError(callback)
  });

  const payload = {
    recipient: phone
  };

  emitter.emit(events.CREATE_CONVERSATION, payload);
};
