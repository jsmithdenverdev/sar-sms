const uuidv1 = require("uuid/v1");
const emitter = require("@common/emitter");
const events = require("@constants/events");
const { wireEvents } = require("@lib/events");
const onDeleteConversation = require("./onDeleteConversation");

const onError = jest.fn();
const onConversationDeleted = jest.fn();
const deleteConversation = jest.fn();

const id = uuidv1();

describe("onDeleteConversation", () => {
  beforeAll(() => {
    wireEvents(emitter)(true)([
      {
        event: events.CONVERSATION_DELETED,
        handler: onConversationDeleted
      },
      {
        event: events.ERROR,
        handler: onError
      }
    ]);
  });

  beforeEach(() => {
    // Clear the onError mock so the call count is reset
    onError.mockClear();
  });

  it("emits CONVERSATION_DELETED on deleteConversation success", () => {
    return onDeleteConversation({ emitter, deleteConversation })({
      id
    }).then(() => {
      expect(onConversationDeleted.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR on deleteConversationFailure", () => {
    deleteConversation.mockImplementation(() => {
      throw new Error();
    });

    return onDeleteConversation({ emitter, deleteConversation })({
      id
    }).then(() => {
      expect(onError.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR if no recipient is passed in", () => {
    return onDeleteConversation({ emitter, deleteConversation })({
      id: null
    }).then(() => {
      expect(onError.mock.calls.length).toBe(1);
    });
  });
});
