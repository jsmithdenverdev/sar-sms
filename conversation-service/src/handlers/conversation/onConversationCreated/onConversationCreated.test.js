const emitter = require("@common/emitter");
const events = require("@constants/events");
const { wireEvents } = require("@lib/events");
const onConversationCreated = require("./onConversationCreated");

const onError = jest.fn();
const callback = jest.fn();

describe("onConversationCreated", () => {
  beforeAll(() => {
    // Register events
    wireEvents(emitter)(true)([
      {
        event: events.ERROR,
        handler: onError
      }
    ]);
  });

  it("invokes the provided callback function", () => {
    const conversation = {
      recipient: "+0000000000"
    };

    onConversationCreated({ callback })({ conversation });

    expect(callback.mock.calls.length).toBe(1);
  });

  it("emits ERROR if callback throws exception", () => {
    const conversation = {
      recipient: "+0000000000"
    };

    onConversationCreated({
      callback: () => {
        throw new Error();
      }
    })({ conversation });

    expect(onError.mock.calls.length).toBe(1);
  });
});
