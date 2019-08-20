const { parsePhoneNumber: libParsePhoneNumber } = require("libphonenumber-js");

const parsePhoneNumber = phoneNumber => {
  try {
    const parsed = libParsePhoneNumber(phoneNumber, "US");
    const { number } = parsed;

    return number;
  } catch (e) {
    throw new Error("Number was not recognized, or was in an invalid format!");
  }
};

module.exports = {
  parsePhoneNumber
};
