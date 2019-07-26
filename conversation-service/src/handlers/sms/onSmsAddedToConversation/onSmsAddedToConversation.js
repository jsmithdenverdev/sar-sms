const events = require("@constants/events");

const onSmsAddedToConversation = ({
  emitter,
  callback,
  publishToQueue
}) => async ({ sms }) => {
  try {
    if (!sms) {
      throw new Error("An SMS is required to publish to the send queue!");
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

module.exports = onSmsAddedToConversation;
