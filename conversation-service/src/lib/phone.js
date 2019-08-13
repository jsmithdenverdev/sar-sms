const { parsePhoneNumber: libPhoneNumberParse } = require("libphonenumber-js");

const parsePhoneNumber = phoneNumber => {
  try {
    const parsed = libPhoneNumberParse(phoneNumber, "US");
    const { number } = parsed;

    return number;
  } catch (e) {
    throw new Error("Number was not recognized, or was in an invalid format!");
  }
};

module.exports = {
  parsePhoneNumber
};
