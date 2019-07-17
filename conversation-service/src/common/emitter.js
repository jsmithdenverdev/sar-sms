const EventEmitter = require("events");

// Allows us to use a singleton event emitter across files
const emitter = new EventEmitter();

module.exports = emitter;
