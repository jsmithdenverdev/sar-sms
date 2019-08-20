const events = require("@constants/events");

const onNewSmsCreated = ({ emitter, callback, publishToQueue }) => async ({
  sms
}) => {
  try {
    if (!sms) {
      throw new Error("An SMS is required to publish to the send queue!");
    }

    if (!sms.recipient) {
      throw new Error("A recipient is required to send an SMS!");
    }

    // TODO: Place these in a config constant
    const region = process.env.REGION;
    const accountId = process.env.AWS_ACCOUNT_ID;
    const topic = `arn:aws:sns:${region}:${accountId}:sendSms`;

    await publishToQueue(topic)({ sms });

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

module.exports = onNewSmsCreated;
