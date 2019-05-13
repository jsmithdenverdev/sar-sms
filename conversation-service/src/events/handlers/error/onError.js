module.exports = callback => payload => {
  const { error, event, originalPayload } = payload;

  // TODO: Write logic that can retry an event
  callback(error, null);
};
