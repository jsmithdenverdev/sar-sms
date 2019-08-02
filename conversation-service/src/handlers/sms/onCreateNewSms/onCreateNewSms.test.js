const emitter = require("@common/emitter");
const events = require("@constants/events");
const { wireEvents } = require("@lib/events");
const onCreateNewSms = require("./onCreateNewSms");

const onError = jest.fn();
const addSmsToConversation = jest.fn();
const onNewSmsCreated = jest.fn();
const createUUID = jest.fn(() => 1);
const conversationId = createUUID();
const body = "Test";

describe("onCreateNewSms", () => {
  beforeAll(() => {
    wireEvents(emitter)(true)([
      {
        event: events.NEW_SMS_CREATED,
        handler: onNewSmsCreated
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
    return onCreateNewSms({
      emitter,
      addSmsToConversation,
      createUUID
    })({ conversationId, body }).then(() => {
      expect(onNewSmsCreated.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR on addSmsToConversation failure", () => {
    addSmsToConversation.mockImplementation(() => {
      throw new Error();
    });

    return onCreateNewSms({
      emitter,
      addSmsToConversation,
      createUUID
    })({ conversationId, body }).then(() => {
      expect(onError.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR when no conversationId provided", () => {
    return onCreateNewSms({
      emitter,
      addSmsToConversation,
      createUUID
    })({ body }).then(() => {
      expect(onError.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR when no body prodivded", () => {
    return onCreateNewSms({
      emitter,
      addSmsToConversation,
      createUUID
    })({ conversationId }).then(() => {
      expect(onError.mock.calls.length).toBe(1);
    });
  });
});
