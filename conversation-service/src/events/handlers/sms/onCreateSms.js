const { ERROR, SMS_CREATED } = require("../../events");
const { SMS_STATUSES } = require("../../../constants/conversation");

const onCreateSms = ({
  emitter,
  readConversation,
  updateConversation,
  createUUID
}) => async ({ recipient, body, recieved }) => {
  try {
    const conversation = await readConversation(recipient.slice(1));

    if (!conversation) {
      emitter.emit(ERROR, {
        error: "A conversation for this phone number was not found!"
      });

      return;
    }

    const sms = {
      id: createUUID(),
      body,
      status: recieved ? SMS_STATUSES.RECIEVED : SMS_STATUSES.PENDING,
      created: new Date(Date.now()).toISOString(),
      modified: new Date(Date.now()).toISOString()
    };

    await updateConversation({
      ...conversation,
      sms: [...conversation.sms, sms]
    });

    // 'recieved' is a flag that tells us the sms was sent from our system to this number
    // if we did not 'recieve' the sms then we tell the system that a new one was created
    // and twilio needs to send it
    if (!recieved) {
      emitter.emit(SMS_CREATED, { sms: newSms, recipient });
    }
  } catch (e) {
    emitter.emit(ERROR, {
      error: e
    });
  }
};

module.exports = onCreateSms;
