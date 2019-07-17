const emitter = require("@common/emitter");
const events = require("@constants/events");
const onDeleteConversation = require("./onDeleteConversation");

let onError;
const onConversationDeleted = jest.fn();
const deleteConversation = jest.fn();

const recipient = "10000000000";

describe("onDeleteConversation", () => {
  beforeEach(() => {
    // re-initialize the onError mock so the call count is reset
    onError = jest.fn();

    // re-initailize the event emitter to be in an empty state
    emitter.removeAllListeners();
    emitter.on(events.CONVERSATION_DELETED, onConversationDeleted);
    emitter.on(events.ERROR, onError);
  });

  it("emits CONVERSATION_DELETED on deleteConversation success", () => {
    return onDeleteConversation({ emitter, deleteConversation })({
      recipient
    }).then(() => {
      expect(onConversationDeleted.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR on deleteConversationFailure", () => {
    deleteConversation.mockImplementation(() => {
      throw new Error();
    });

    return onDeleteConversation({ emitter, deleteConversation })({
      recipient
    }).then(() => {
      expect(onError.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR if no recipient is passed in", () => {
    return onDeleteConversation({ emitter, deleteConversation })({
      recipient: null
    }).then(() => {
      expect(onError.mock.calls.length).toBe(1);
    });
  });
});
