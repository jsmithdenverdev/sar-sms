const aws = require("aws-sdk");
const region = process.env.REGION;
const table = process.env.DYNAMODB_TABLE;
const { DocumentClient } = aws.DynamoDB;

aws.config.update({ region });

const client = new DocumentClient({ apiVersion: "2012-08-10" });

const baseParams = {
  TableName: table
};

const createConversation = conversation =>
  new Promise((resolve, reject) => {
    const params = {
      ...baseParams,
      Item: conversation
    };

    client.put(params, err => {
      if (err) {
        reject(err);
      } else {
        // Nothing is returned from AWS on create
        // so we just return the conversation supplied
        resolve(conversation);
      }
    });
  });

const readConversation = recipient =>
  new Promise((resolve, reject) => {
    const params = {
      ...baseParams,
      Key: {
        recipient
      }
    };

    client.get(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Item);
      }
    });
  });

const addSmsToConversation = (sms, recipient) =>
  new Promise((resolve, reject) => {
    if (!recipient) {
      reject("A recipient is required to add an sms!");
    }

    const params = {
      ...baseParams,
      Key: {
        recipient
      },
      UpdateExpression: "SET #sms = list_append(#sms, :s)",
      ExpressionAttributeValues: {
        ":s": [sms]
      },
      ExpressionAttributeNames: {
        "#sms": "sms"
      },
      ReturnValues: "UPDATED_NEW"
    };

    client.update(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Item);
      }
    });
  });

const deleteConversation = recipient =>
  new Promise((resolve, reject) => {
    const params = {
      ...baseParams,
      Key: {
        recipient
      }
    };

    client.delete(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Item);
      }
    });
  });

const listConversations = () =>
  new Promise((resolve, reject) => {
    const params = {
      ...baseParams
    };

    let conversations = [];

    const scanCallback = (err, data) => {
      if (err) {
        reject(err);
      } else {
        data.Items.forEach(item => {
          conversations.push(item);
        });

        if (data.LastEvaluatedKey) {
          params.ExclusiveStartKey = data.LastEvaluatedKey;
          client.scan(params, scanCallback);
        } else {
          resolve(conversations);
        }
      }
    };

    client.scan(params, scanCallback);
  });

module.exports = {
  createConversation,
  readConversation,
  addSmsToConversation,
  deleteConversation,
  listConversations
};
