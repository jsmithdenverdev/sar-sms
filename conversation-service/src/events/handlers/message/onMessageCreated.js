const emitter = require("../../emitter");
const events = require("../../events");
const SNS = require("aws-sdk/clients/sns");

module.exports = callback => async ({ recipient, message }) => {
  const region = process.env.REGION;
  const accountId = process.env.AWS_ACCOUNT_ID;
  const topicArn = `arn:aws:sns:${region}:${accountId}:sendSms`;
  const sns = new SNS();

  // On message created publish it to SNS to be handled
  // by the SMS service.
  // sns.publish(
  //   {
  //     TopicArn: topicArn,
  //     Message: JSON.stringify({ recipient, message })
  //   },
  //   err => {
  //     if (err) {
  //       emitter.emit(events.ERROR, {
  //         error: err
  //       });
  //     }
  //   }
  // );

  // Call the AWS callback to return a response to the user
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(message),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  });
};
