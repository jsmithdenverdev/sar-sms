const emitter = require("../../emitter");
const events = require("../../events");
const DynamoDb = require("../../../lib/DynamoDb");

module.exports = callback => async ({ recipient }) => {
  try {
    // The recipient phone number is the primary key (ie +1-123-456-7890 => { id: 1234567890 })
    const conversation = await DynamoDb.read(recipient.slice(1));

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
