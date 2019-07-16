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

const getConversation = id =>
  new Promise((resolve, reject) => {
    const params = {
      ...baseParams,
      Key: {
        id
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

const addSmsToConversation = (sms, id) =>
  new Promise((resolve, reject) => {
    const params = {
      ...baseParams,
      Key: {
        id
      },
      UpdateExpression: "SET sms = list_append(sms, :s)",
      ExpressionAttributeValues: {
        ":s": sms
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

const deleteConversation = id =>
  new Promise((resolve, reject) => {
    const params = {
      ...baseParams,
      Key: {
        id
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
  getConversation,
  addSmsToConversation,
  deleteConversation,
  listConversations
};
