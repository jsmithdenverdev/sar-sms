const emitter = require("@common/emitter");
const events = require("@constants/events");
const { wireEvents } = require("@lib/events");
const onRecievedSmsCreated = require("./onRecievedSmsCreated");

const onError = jest.fn();
const callback = jest.fn();
const sms = {};

describe("onRecievedSmsCreated", () => {
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

  it("calls provided callback", () => {
    return onRecievedSmsCreated({ emitter, callback })({ sms }).then(() => {
      expect(callback.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR on callback failure", () => {
    callback.mockImplementation(() => {
      throw new Error();
    });

    return onRecievedSmsCreated({ emitter, callback })({ sms }).then(() => {
      expect(onError.mock.calls.length).toBe(1);
    });
  });
});
