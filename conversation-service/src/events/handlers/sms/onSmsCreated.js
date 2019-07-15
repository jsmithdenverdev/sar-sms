const events = require("../../events");

const onSmsCreated = ({ callback, publishToQueue, emitter }) => async ({
  sms,
  recipient
}) => {
  try {
    const region = process.env.REGION;
    const accountId = process.env.AWS_ACCOUNT_ID;
    const topic = `arn:aws:sns:${region}:${accountId}:sendSms`;

    // When a new sms is created it needs to be queued up to be sent
    await publishToQueue({ topic })(JSON.stringify({ sms, recipient }));

    // Call the AWS callback to return a response to the user
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(sms),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    });
  } catch (e) {
    emitter.emit(events.ERROR, {
      error: e
    });
  }
};

module.exports = onSmsCreated;
