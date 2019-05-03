const emitter = require("../emitter");
const SNS = require("aws-sdk/clients/sns");
const { PROCESSING_COMPLETED, ERROR } = require("../events");

const region = process.env.REGION;
const accountId = process.env.AWS_ACCOUNT_ID;
const topicArn = `arn:aws:sns:${region}:${accountId}:smsRecieved`;

const sns = new SNS();

module.exports = inboundSms =>
  sns.publish(
    {
      TopicArn: topicArn,
      Message: JSON.stringify(inboundSms)
    },
    err => {
      if (err) {
        emitter.emit(ERROR, {
          error: err
        });
      } else {
        emitter.emit(PROCESSING_COMPLETED);
      }
    }
  );
