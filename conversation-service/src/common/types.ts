export interface EventHandler {
  handle(payload: any): void;
}

export class EventBinding {
  constructor(public name: string, public handler: EventHandler) {}
}
