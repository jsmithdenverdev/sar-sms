const onError = ({ callback }) => ({ error, event, originalPayload }) => {
  // TODO: Write logic that can retry an event
  callback(error, null);
};

module.exports = onError;
