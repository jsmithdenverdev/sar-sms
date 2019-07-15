const events = require("../../events");
const { SMS_STATUSES } = require("../../../constants/conversation");

const onUpdateSmsStatus = ({
  emitter,
  readConversation,
  updateConversation
}) => async ({ sms, recipient }) => {
  try {
    const conversation = await readConversation(recipient.slice(1));

    if (!conversation) {
      emitter.emit(events.ERROR, {
        error: "A conversation for this ID was not found!"
      });
    }

    const index = conversation.sms.findIndex(item => item.id === sms.id);
    const before = conversation.sms.slice(0, index);
    const after = conversation.sms.slice(index + 1, conversation.sms.length);

    const updated = {
      ...sms,
      status: SMS_STATUSES.SENT,
      modified: new Date(Date.now()).toISOString()
    };

    await updateConversation({
      ...conversation,
      sms: [...before, updated, ...after]
    });
  } catch (e) {
    emitter.emit(events.ERROR, {
      error: e
    });
  }
};

module.exports = onUpdateSmsStatus;
