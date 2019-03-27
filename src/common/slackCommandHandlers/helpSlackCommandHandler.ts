import SlackClientService from "../services/slackClient"
import BaseSlackCommandHandler from "./baseSlackCommandHandler"

export default class HelpSlackCommandHandler extends BaseSlackCommandHandler {
  protected slackClientService = new SlackClientService()
  public onHandleCommand(): void {
    this.slackClientService.sendMessage(
      this.translationsService.getTranslation(
        "hereYouWillFindAllCommandsThatYouCanUse"
      ),
      this.eventInfo
    )
  }
}
