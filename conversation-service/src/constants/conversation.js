const PENDING = "PENDING";
const DELIVERED = "DELIVERED";
const FAILED = "FAILED";
const RECIEVED = "RECIEVED";

const SMS_STATUSES = {
  SENT: DELIVERED,
  PENDING,
  FAILED,
  RECIEVED
};

module.exports = {
  SMS_STATUSES
};
