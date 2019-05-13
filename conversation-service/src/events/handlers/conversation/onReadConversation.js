const emitter = require("../../emitter");
const events = require("../../events");
const DynamoDb = require("../../../lib/DynamoDb");

module.exports = callback => async payload => {
  const { conversationId } = payload;

  try {
    const conversation = await DynamoDb.read(conversationId);

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(conversation),
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
