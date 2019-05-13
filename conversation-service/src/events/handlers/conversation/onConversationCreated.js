module.exports = callback => payload => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(payload),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  });
};
