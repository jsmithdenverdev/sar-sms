const emitter = require("@common/emitter");
const events = require("@constants/events");
const { wireEvents } = require("@lib/events");
const onCreateRecievedSms = require("./onCreateRecievedSms");

const recipient = "+10000000000";
const body = "Test";
const onError = jest.fn();
const addSmsToConversation = jest.fn();
const onRecievedSmsCreated = jest.fn();
const parsePhoneNumber = jest.fn(() => recipient);

describe("onCreateRecievedSms", () => {
  beforeAll(() => {
    wireEvents(emitter)(true)([
      {
        event: events.RECIEVED_SMS_CREATED,
        handler: onRecievedSmsCreated
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

  it("emits RECIEVED_SMS_CREATED on addSmsToConversation success", () => {
    return onCreateRecievedSms({
      emitter,
      addSmsToConversation,
      parsePhoneNumber
    })({ recipient, body }).then(() => {
      expect(onRecievedSmsCreated.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR on addSmsToConversation failure", () => {
    addSmsToConversation.mockImplementation(() => {
      throw new Error();
    });

    return onCreateRecievedSms({
      emitter,
      addSmsToConversation,
      parsePhoneNumber
    })({ recipient, body }).then(() => {
      expect(onError.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR when no recipient provided", () => {
    return onCreateRecievedSms({
      emitter,
      addSmsToConversation,
      parsePhoneNumber
    })({ body }).then(() => {
      expect(onError.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR when no body prodivded", () => {
    return onCreateRecievedSms({
      emitter,
      addSmsToConversation,
      parsePhoneNumber
    })({ recipient }).then(() => {
      expect(onError.mock.calls.length).toBe(1);
    });
  });
});
