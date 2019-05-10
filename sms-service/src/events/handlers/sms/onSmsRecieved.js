const twilio = require("twilio");

module.exports = callback => () => {
  const { twiml } = twilio;
  const { MessagingResponse } = twiml;

  const response = new MessagingResponse();

  response.message("YOUR MESSAGE HAS BEEN RECIEVED.");

  callback(null, {
    statusCode: 200,
    body: response.toString(),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/xml"
    }
  });
};
