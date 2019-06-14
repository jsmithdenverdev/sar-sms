import { EventEmitter } from "events";
import { EventBinding } from "../common/types";

export default class EventManager {
  constructor(private eventEmitter: EventEmitter) {}

  WireEvents(bindings: EventBinding[]) {
    bindings.forEach(({ name, handler }) => {
      this.eventEmitter.on(name, handler.handle.bind(handler));
    });
  }
}
