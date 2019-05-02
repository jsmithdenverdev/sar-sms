module.exports.handle = (event, context, callback) => {
  callback(null, {
    body: JSON.stringify({ name: "twilio-callback" }),
    statusCode: 200
  });
};
