const emitter = require("@common/emitter");
const events = require("@constants/events");
const { wireEvents } = require("@lib/events");
const onReadConversation = require("./onReadConversation");

const recipient = "+10000000000";
const onError = jest.fn();
const readConversation = jest.fn();
const callback = jest.fn();
const parsePhoneNumber = jest.fn(_ => recipient);

describe("onReadConversation", () => {
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

  it("calls provided callback on readConversation success", () => {
    return onReadConversation({
      callback,
      emitter,
      readConversation,
      parsePhoneNumber
    })({
      recipient
    }).then(() => {
      expect(callback.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR on readConversation failure", () => {
    readConversation.mockImplementation(() => {
      throw new Error();
    });

    return onReadConversation({
      callback,
      emitter,
      readConversation,
      parsePhoneNumber
    })({
      recipient
    }).then(() => {
      expect(callback.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR when no recipient passed in", () => {
    return onReadConversation({
      callback,
      emitter,
      readConversation,
      parsePhoneNumber
    })({
      recipient: null
    }).then(() => {
      expect(callback.mock.calls.length).toBe(1);
    });
  });
});
