const emitter = require("@common/emitter");
const events = require("@constants/events");
const { wireEvents } = require("@lib/events");
const onConversationDeleted = require("./onConversationDeleted");

const onError = jest.fn();
const callback = jest.fn();

const recipient = "+11111111111";

describe("onConversationDeleted", () => {
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
    callback.mockReset();
  });

  it("calls provided callback with stringified recipient", () => {
    onConversationDeleted({ callback })({ recipient });

    const callbackParam = callback.mock.calls[0][1];

    expect(callbackParam.body).toBeTruthy();
    expect(callbackParam.body).toBe(JSON.stringify(recipient));
  });
});
