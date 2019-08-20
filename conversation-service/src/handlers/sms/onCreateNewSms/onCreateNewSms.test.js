const emitter = require("@common/emitter");
const events = require("@constants/events");
const { wireEvents } = require("@lib/events");
const onCreateNewSms = require("./onCreateNewSms");

const onError = jest.fn();
const addSmsToConversation = jest.fn();
const onNewSmsCreated = jest.fn();
const recipient = "+10000000000";
const parsePhoneNumber = jest.fn(_ => recipient);
const readConversation = jest.fn(() => ({ recipient }));
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
      readConversation,
      parsePhoneNumber
    })({ recipient, body }).then(() => {
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
      readConversation,
      parsePhoneNumber
    })({ recipient, body }).then(() => {
      expect(onError.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR when no recipient provided", async () => {
    await onCreateNewSms({
      emitter,
      addSmsToConversation,
      readConversation,
      parsePhoneNumber
    })({ body });

    const onErrorPayload = onError.mock.calls[0][0];
    const { error } = onErrorPayload;
    const { message } = error;

    expect(onError.mock.calls.length).toBe(1);
    expect(message).toBe("A recipient is required to send an SMS message!");
  });

  it("emits ERROR when no body prodivded", async () => {
    await onCreateNewSms({
      emitter,
      addSmsToConversation,
      readConversation,
      parsePhoneNumber
    })({ recipient });

    const onErrorPayload = onError.mock.calls[0][0];
    const { error } = onErrorPayload;
    const { message } = error;

    expect(onError.mock.calls.length).toBe(1);
    expect(message).toBe("An SMS message must have a body!");
  });
});
