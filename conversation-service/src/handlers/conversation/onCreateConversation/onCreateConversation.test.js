const emitter = require("@common/emitter");
const events = require("@constants/events");
const onCreateConversation = require("./onCreateConversation");

const onError = jest.fn();
const createConversation = jest.fn();
const onConversationCreated = jest.fn();

const conversation = {
  recipient: "+10000000000"
};

describe("onCreateConversation", () => {
  beforeAll(() => {
    emitter.on(events.CONVERSATION_CREATED, onConversationCreated);
    emitter.on(events.ERROR, onError);
  });

  it("emits CONVERSATION_CREATED on createConversation success", () => {
    return onCreateConversation({ emitter, createConversation })({
      recipient: conversation.recipient
    }).then(() => {
      expect(onConversationCreated.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR on createConversation failure", () => {
    createConversation.mockImplementation(() => {
      throw new Error();
    });

    return onCreateConversation({ emitter, createConversation })({
      recipient: conversation.recipient
    }).then(() => {
      expect(onError.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR when no recipient provided", () => {
    return onCreateConversation({ emitter, createConversation })({
      recipient: null
    }).then(() => {
      expect(onError.mock.calls.length).toBe(1);
    });
  });
});
