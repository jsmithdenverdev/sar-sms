const { EventEmitter } = require("events");
// Create and export a singleton EventEmitter
const emitter = new EventEmitter();

module.exports = emitter;
