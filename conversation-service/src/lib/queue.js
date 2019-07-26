const SNS = require("aws-sdk/clients/sns");

const publishToQueue = topic => payload =>
  new Promise((resolve, reject) => {
    const sns = new SNS();
    sns.publish(
      {
        TopicArn: topic,
        Message: JSON.stringify(payload)
      },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });

module.exports = {
  publishToQueue
};
