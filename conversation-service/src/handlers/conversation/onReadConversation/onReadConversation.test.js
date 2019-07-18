const emitter = require("@common/emitter");
const events = require("@constants/events");
const onReadConversation = require("./onReadConversation");

const onError = jest.fn();
const readConversation = jest.fn();
const callback = jest.fn();

const recipient = "+11234567890";

describe("onReadConversation", () => {
  beforeAll(() => {
    emitter.on(events.ERROR, onError);
  });

  beforeEach(() => {
    onError.mockReset();
  });

  it("calls provided callback on readConversation success", () => {
    return onReadConversation({ callback, emitter, readConversation })({
      recipient
    }).then(() => {
      expect(callback.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR on readConversation failure", () => {
    readConversation.mockImplementation(() => {
      throw new Error();
    });

    return onReadConversation({ callback, emitter, readConversation })({
      recipient
    }).then(() => {
      expect(callback.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR when no recipient passed in", () => {
    return onReadConversation({ callback, emitter, readConversation })({
      recipient: null
    }).then(() => {
      expect(callback.mock.calls.length).toBe(1);
    });
  });
});
