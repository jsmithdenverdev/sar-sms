const emitter = require("@common/emitter");
const events = require("@constants/events");
const { wireEvents } = require("@lib/events");
const onSmsAddedToConversation = require("./onSmsAddedToConversation");

const onError = jest.fn();
const publishToQueue = jest.fn(() => () => Promise.resolve());
const callback = jest.fn();

const sms = {};
const recipient = "0000000000";

describe("onSmsAddedToConversation", () => {
  beforeAll(() => {
    wireEvents(emitter)(true)([
      {
        event: events.ERROR,
        handler: onError
      }
    ]);
  });

  beforeEach(() => {
    onError.mockReset();
  });

  it("calls provided callback on publishToQueue success ", () => {
    return onSmsAddedToConversation({ emitter, callback, publishToQueue })({
      sms,
      recipient
    }).then(() => {
      expect(callback.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR on publishToQueue failure", () => {
    publishToQueue.mockImplementation(() => () => Promise.reject());

    return onSmsAddedToConversation({ emitter, callback, publishToQueue })({
      sms,
      recipient
    }).then(() => {
      expect(onError.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR if no sms provided", () => {
    return onSmsAddedToConversation({ emitter, callback, publishToQueue })({
      recipient
    }).then(() => {
      expect(onError.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR if no recipient provided", () => {
    return onSmsAddedToConversation({ emitter, callback, publishToQueue })({
      sms
    }).then(() => {
      expect(onError.mock.calls.length).toBe(1);
    });
  });
});
