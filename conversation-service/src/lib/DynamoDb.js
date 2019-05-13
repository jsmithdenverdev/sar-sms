const aws = require("aws-sdk");
const uuid = require("uuid/v1");

function DynamoDb({ region, table }) {
  const { DocumentClient } = aws.DynamoDB;

  // Set the region for AWS
  aws.config.update({ region });

  const client = new DocumentClient({ apiVersion: "2012-08-10" });

  const create = (key, item) =>
    new Promise((resolve, reject) => {
      const params = {
        TableName: table,
        Item: {
          id: key ? key : uuid(),
          ...item
        }
      };
      client.put(params, (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(data);
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
          return;
        }

        resolve(data);
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
          return;
        }

        resolve(data);
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
          return;
        }

        resolve(data);
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
        ExpressionAttributeValues: attributes
      };

      client.update(params, (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(data);
      });
    });

  return {
    create,
    list,
    read,
    remove,
    update
  };
}

// Exporting a singleton DynamoDb
module.exports = DynamoDb({
  table: process.env.DYNAMODB_TABLE,
  region: process.env.REGION
});
