const onConversationDeleted = ({ callback }) => ({ recipient }) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(recipient),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  });
};

module.exports = onConversationDeleted;
