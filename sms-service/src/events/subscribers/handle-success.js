module.exports = callback => sms => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(sms),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  });
};
