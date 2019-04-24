import {
  Controller,
  Get,
  Request as RequestDecorator,
  Response as ResponseDecorator
} from '@decorators/express'
import { Request, Response } from 'express'
import SlackConsts from '../common/consts/slack'

@Controller('/')
export default class LandingPageController {
  @Get('/')
  public async install(
    @RequestDecorator() req: Request,
    @ResponseDecorator() res: Response
  ) {
    res.render('index', { slackInstalHref: SlackConsts.slackInstallLink })
  }
}
