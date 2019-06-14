export interface EventHandler {
  handle(payload: any): void;
}

export type EventBinding = {
  name: string;
  handler: EventHandler;
};
