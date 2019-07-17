const emitter = require("@common/emitter");
const events = require("@constants/events");
const onDeleteConversation = require("./onDeleteConversation");

const onError = jest.fn();
const onConversationDeleted = jest.fn();
const deleteConversation = jest.fn();

const recipient = "10000000000";

describe("onDeleteConversation", () => {
  beforeAll(() => {
    emitter.on(events.CONVERSATION_DELETED, onConversationDeleted);
    emitter.on(events.ERROR, onError);
  });

  beforeEach(() => {
    // Clear the onError mock so the call count is reset
    onError.mockClear();
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
