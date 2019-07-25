const emitter = require("@common/emitter");
const events = require("@constants/events");
const { wireEvents } = require("@lib/events");
const onAddSmsToConversation = require("./onAddSmsToConversation");

const onError = jest.fn();
const addSmsToConversation = jest.fn();
const onSmsAddedToConversation = jest.fn();
const createUUID = jest.fn(() => 1);
const conversationId = createUUID();
const body = "Test";

describe("onAddSmsToConversation", () => {
  beforeAll(() => {
    wireEvents(emitter)(true)([
      {
        event: events.SMS_ADDED,
        handler: onSmsAddedToConversation
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

  it("emits SMS_ADDED on addSmsToConversation success", () => {
    return onAddSmsToConversation({
      emitter,
      addSmsToConversation,
      createUUID
    })({ conversationId, body }).then(() => {
      expect(onSmsAddedToConversation.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR on addSmsToConversation failure", () => {
    addSmsToConversation.mockImplementation(() => {
      throw new Error();
    });

    return onAddSmsToConversation({
      emitter,
      addSmsToConversation,
      createUUID
    })({ conversationId, body }).then(() => {
      expect(onError.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR when no conversationId provided", () => {
    return onAddSmsToConversation({
      emitter,
      addSmsToConversation,
      createUUID
    })({ body }).then(() => {
      expect(onError.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR when no body prodivded", () => {
    return onAddSmsToConversation({
      emitter,
      addSmsToConversation,
      createUUID
    })({ conversationId }).then(() => {
      expect(onError.mock.calls.length).toBe(1);
    });
  });
});
