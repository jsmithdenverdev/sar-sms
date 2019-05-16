const twilio = require("twilio");
const emitter = require("../../emitter");
const { ERROR, SMS_SENT } = require("../../events");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_ACCOUNT_KEY;
const from = process.env.TWILIO_PHONE_NUMBER;

const twilioClient = new twilio(accountSid, authToken);

module.exports = ({ sms, recipient }) => {
  const { body } = sms;
  const payload = {
    to: recipient,
    from,
    body
  };

  twilioClient.messages
    .create(payload)
    .then(() => {
      emitter.emit(SMS_SENT, {
        sms,
        recipient
      });
    })
    .catch(e => {
      emitter.emit(ERROR, {
        error: e
      });
    });
};
