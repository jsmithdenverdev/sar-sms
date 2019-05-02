const twilio = require("twilio");
const emitter = require("../emitter");
const { ERROR, SMS_SENT, SMS_REQUEST_RECIEVED } = require("../events");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_ACCOUNT_KEY;
const from = process.env.TWILIO_PHONE_NUMBER;

const twilioClient = new twilio(accountSid, authToken);

module.exports = ({ to, body }) => {
  const payload = {
    to,
    from,
    body
  };

  twilioClient.messages
    .create(payload)
    .then(sms => {
      emitter.emit(SMS_SENT, sms);
    })
    .catch(e => {
      emitter.emit(ERROR, {
        event: SMS_REQUEST_RECIEVED,
        error: e,
        originalPayload: { to, body }
      });
    });
};
