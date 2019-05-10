const emitter = require('../../emitter');
const events = require('../../events');
const DynamoDb = require('../../../lib/DynamoDb');

module.exports = callback => async () => {
  try {
    const client = DynamoDb({
      table: process.env.DYNAMODB_TABLE,
      region: process.env.REGION
    });

    // Get all conversations
    const conversations = await client.list();

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(conversations),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    });
  } catch (e) {
    emitter.emit(events.ERROR, {
      error: e
    });
  }
};