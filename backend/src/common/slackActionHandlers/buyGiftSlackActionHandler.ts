import { IGiftTransfer } from "../../models/giftTransfer.model"
import { SlackResponseType } from "../factories/definitions/slackCommandHandlerFactory"
import GiftTransferService from "../services/giftTransfer"
import LoggerService from "../services/logger"
import BaseSlackActionHandler from "./baseSlackActionHandler"

export default class BuyGiftSlackActionHandler extends BaseSlackActionHandler {
  private giftTransferService = new GiftTransferService()
  get giftAction() {
    const [giftClickAction] = this.action.actions
    return giftClickAction
  }

  get giftId() {
    return this.giftAction.value
  }

  get giftName() {
    return this.giftAction.name
  }

  get giftTransfer(): IGiftTransfer {
    return {
      giftId: this.giftId,
      teamId: this.teamId,
      userId: this.userId
    }
  }

  public async validate(): Promise<void> {
    const giftInStockAndUserHasKudos =
      await this.giftTransferService.validateTransfer(this.giftTransfer)

    if (!giftInStockAndUserHasKudos) {
      throw new Error(
        this.translationsService.getTranslation(
          "youDontHaveEnoughKudosOrGiftOut"
        )
      )
    }
  }

  public async onHandleAction(): Promise<void> {
    const { name, cost } = await this.giftTransferService
      .transferGift(this.giftTransfer)

    this.sendMessage(
      this.translationsService.getTranslation(
        "youBoughtGift",
        name,
        cost
      ),
      this.messageConsumer,
      SlackResponseType.Hidden
    )
  }
}

