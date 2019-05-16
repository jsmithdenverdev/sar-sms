const aws = require("aws-sdk");
const uuid = require("uuid/v1");

const region = process.env.REGION;
const table = process.env.DYNAMODB_TABLE;
const { DocumentClient } = aws.DynamoDB;

// Set the region for AWS
aws.config.update({ region });

const client = new DocumentClient({ apiVersion: "2012-08-10" });

function DynamoDb({ client, table }) {
  const create = (id, item) =>
    new Promise((resolve, reject) => {
      const params = {
        TableName: table,
        Item: {
          id,
          ...item
        }
      };

      client.put(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          // Data comes back empty so we return the raw item 
          resolve(params.Item);
        }
      });
    });

  const read = id =>
    new Promise((resolve, reject) => {
      const params = {
        TableName: table,
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

  const update = (id, expression, attributes) =>
    new Promise((resolve, reject) => {
      const params = {
        TableName: table,
        Key: {
          id
        },
        UpdateExpression: expression,
        ExpressionAttributeValues: attributes,
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

  const remove = id =>
    new Promise((resolve, reject) => {
      const params = {
        TableName: table,
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

  const list = () =>
    new Promise((resolve, reject) => {
      const params = {
        TableName: table
      };

      client.scan(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Items);
        }
      });
    });

  return {
    create,
    read,
    update,
    remove,
    list
  };
}

// Exporting a singleton DynamoDb
module.exports = DynamoDb({
  client,
  table
});
