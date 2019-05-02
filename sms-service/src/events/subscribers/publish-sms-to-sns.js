const emitter = require("../emitter");
const SNS = require("aws-sdk/clients/sns");
const { PROCESSING_COMPLETED, ERROR } = require("../events");

const region = process.env.REGION;
const accountId = process.env.AWS_ACCOUNT_ID;
const topicArn = `arn:aws:sns:${region}:${accountId}:smsSent`;

const sns = new SNS();

module.exports = sms =>
  sns.publish(
    {
      TopicArn: topicArn,
      Message: JSON.stringify({ sms })
    },
    err => {
      if (err) {
        emitter.emit(ERROR, {
          error: err
        });
      } else {
        emitter.emit(PROCESSING_COMPLETED, sms);
      }
    }
  );
