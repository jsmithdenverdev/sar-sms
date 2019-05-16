const emitter = require("../../emitter");
const events = require("../../events");
const SNS = require("aws-sdk/clients/sns");

module.exports = ({ sms, recipient }) => {
  const region = process.env.REGION;
  const accountId = process.env.AWS_ACCOUNT_ID;
  const topicArn = `arn:aws:sns:${region}:${accountId}:smsSent`;
  const sns = new SNS();

  sns.publish(
    {
      TopicArn: topicArn,
      Message: JSON.stringify({ sms, recipient })
    },
    err => {
      if (err) {
        emitter.emit(events.ERROR, {
          error: err
        });
      }
    }
  );
};
