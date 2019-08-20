const emitter = require("@common/emitter");
const events = require("@constants/events");
const { wireEvents } = require("@lib/events");
const onNewSmsCreated = require("./onNewSmsCreated");

const onError = jest.fn();
const publishToQueue = jest.fn(() => () => Promise.resolve());
const callback = jest.fn();

const sms = {
  body: "test"
};

describe("onNewSmsCreated", () => {
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
    return onNewSmsCreated({ emitter, callback, publishToQueue })({
      sms
    }).then(() => {
      expect(callback.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR on publishToQueue failure", () => {
    publishToQueue.mockImplementation(() => {
      throw new Error();
    });

    return onNewSmsCreated({ emitter, callback, publishToQueue })({
      sms
    }).then(() => {
      expect(onError.mock.calls.length).toBe(1);
    });
  });

  it("emits ERROR if no sms provided", () => {
    return onNewSmsCreated({ emitter, callback, publishToQueue })().then(() => {
      expect(onError.mock.calls.length).toBe(1);
    });
  });

  it("invokes the provided callback function", () => {
    return onNewSmsCreated({ emitter, callback, publishToQueue })({
      sms
    }).then(() => {
      const callbackParam = callback.mock.calls[0][1];

      expect(callback.mock.calls.length).toBe(1);
      expect(callbackParam.body).toBeTruthy();
      expect(callbackParam.body).toBe(JSON.stringify(sms));
    });
  });
});
