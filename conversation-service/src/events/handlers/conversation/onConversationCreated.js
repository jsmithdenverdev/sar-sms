module.exports = callback => ({ conversation }) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(conversation),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  });
};
