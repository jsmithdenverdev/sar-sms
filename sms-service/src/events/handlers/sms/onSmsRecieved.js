const twilio = require("twilio");
const SNS = require("aws-sdk/clients/sns");
const emitter = require("../../emitter");
const events = require("../../events");

module.exports = callback => ({ body, phone }) => {
  const { twiml } = twilio;
  const { MessagingResponse } = twiml;

  const region = process.env.REGION;
  const accountId = process.env.AWS_ACCOUNT_ID;
  const topicArn = `arn:aws:sns:${region}:${accountId}:smsRecieved`;
  const sns = new SNS();

  const response = new MessagingResponse();

  response.message("YOUR MESSAGE HAS BEEN RECIEVED.");

  sns.publish(
    {
      TopicArn: topicArn,
      Message: JSON.stringify({ body, recipient: phone })
    },
    err => {
      if (err) {
        emitter.emit(events.ERROR, {
          error: err
        });
      }
    }
  );

  callback(null, {
    statusCode: 200,
    body: response.toString(),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/xml"
    }
  });
};
