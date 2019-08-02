const events = require("@constants/events");

const onRecievedSmsCreated = ({ emitter, callback }) => async ({ sms }) => {
  try {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(sms),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    emitter.emit(events.ERROR, { error });
  }
};

module.exports = onRecievedSmsCreated;
