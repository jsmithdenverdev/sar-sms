const emitter = require("@common/emitter");
const events = require("@constants/events");
const { wireEvents } = require("@lib/events");
const onCreateConversation = require("./onCreateConversation");

const onError = jest.fn();
const createConversation = jest.fn();
const onConversationCreated = jest.fn();
const parsePhoneNumber = jest.fn(_ => "+10000000000");

const conversation = {
  recipient: "+10000000000"
};

describe("onCreateConversation", () => {
  beforeAll(() => {
    wireEvents(emitter)(true)([
      {
        event: events.CONVERSATION_CREATED,
        handler: onConversationCreated
      },
      {
        event: events.ERROR,
        handler: onError
      }
    ]);
  });

  beforeEach(() => {
    onError.mockClear();
  });

  it("emits CONVERSATION_CREATED on createConversation success", () => {
    return onCreateConversation({
      emitter,
      createConversation,
      parsePhoneNumber
    })({
      recipient: conversation.recipient
    }).then(() => {
      expect(onConversationCreated.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR on createConversation failure", () => {
    createConversation.mockImplementation(() => {
      throw new Error();
    });

    return onCreateConversation({
      emitter,
      createConversation,
      parsePhoneNumber
    })({
      recipient: conversation.recipient
    }).then(() => {
      expect(onError.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR when no recipient provided", () => {
    return onCreateConversation({
      emitter,
      createConversation,
      parsePhoneNumber
    })({
      recipient: null
    }).then(() => {
      expect(onError.mock.calls.length).toBe(1);

      const onErrorPayload = onError.mock.calls[0][0];
      const { error } = onErrorPayload;
      const { message } = error;

      expect(message).toBe("A conversation must have a recipient!");
    });
  });
});
