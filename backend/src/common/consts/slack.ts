import { SlackActionsCallbacks } from "../factories/definitions/slackCommandHandlerFactory"

export default class SlackConsts {
  public static get slackAuthUrl(): string {
    return 'https://slack.com/api/oauth.access'
  }

  public static get buyGiftCallback(): string {
    return SlackActionsCallbacks.BuyGift.toString()
  }

  public static get directMessageType(): string {
    return 'directmessage'
  }

  public static get slackInstallLink(): string {
    // tslint:disable-next-line:max-line-length
    return `https://slack.com/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=bot,channels:read,chat:write:bot,groups:read,users:read,commands`
  }

  public static get slackClientId(): string {
    return process.env.CLIENT_ID
  }
}
