import { IEventHandler } from "../types";

export default class CreateConversationHandler implements IEventHandler {
  handle({ recipient }: { recipient: string }): void {
    console.log(recipient);
  }
}
