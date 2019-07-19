const emitter = require("@common/emitter");
const events = require("@constants/events");
const onListConversation = require("./onListConveration");

const onError = jest.fn();
const listConversations = jest.fn();
const callback = jest.fn();

const conversations = [
  {
    recipient: "+11111111111",
    sms: []
  },
  {
    recipient: "+12222222222",
    sms: []
  }
];

describe("onListConversation", () => {
  beforeAll(() => {
    emitter.on(events.ERROR, onError);
  });

  beforeEach(() => {
    onError.mockReset();
    callback.mockReset();
  });

  it("calls provided callback on listConversation success", () => {
    return onListConversation({ callback, emitter, listConversations })().then(
      () => {
        expect(callback.mock.calls.length).toBe(1);
      }
    );
  });

  it("calls provided callback with stringified array of conversations", () => {
    listConversations.mockImplementation(() => Promise.resolve(conversations));

    return onListConversation({ callback, emitter, listConversations })().then(
      () => {
        const callbackParam = callback.mock.calls[0][1];

        expect(callbackParam.body).toBeTruthy();
        expect(callbackParam.body).toBe(JSON.stringify(conversations));
      }
    );
  });

  it("emits ERROR on listConversations failure", () => {
    listConversations.mockImplementation(() => Promise.reject());
    return onListConversation({ callback, emitter, listConversations })().then(
      () => {
        expect(onError.mock.calls.length).toBe(1);
      }
    );
  });
});
