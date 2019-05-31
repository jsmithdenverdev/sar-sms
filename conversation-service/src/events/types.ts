export interface IEventHandler {
  handle(payload: any): void;
}

export class EventBinding {
  constructor(public name: string, public handler: IEventHandler) {}
}
