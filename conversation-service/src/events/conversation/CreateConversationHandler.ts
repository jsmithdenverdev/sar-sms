import { EventHandler } from "../../common/types";

export default class CreateConversationHandler implements EventHandler {
  handle({ recipient }: { recipient: string }): void {
    console.log(recipient);
  }
}
