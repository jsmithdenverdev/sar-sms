module.exports = callback => ({ event, error, originalPayload }) => {
  console.log({
    event,
    error,
    originalPayload
  });

  callback(null, {
    statusCode: 500,
    body: JSON.stringify(error),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  });
};
