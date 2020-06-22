import { BotService } from './bot/bot.service';
import { Get, Post, Controller, Res, HttpStatus, Body } from '@nestjs/common';
@Controller()
export class AppController {
  constructor(private botService: BotService) {}

  @Get()
  dialogueHomepage(@Res() res) {
    res.render('index');
  }
  @Post()
  startDialogue(@Res() res, @Body() data) {
    this.botService.sendDialogue(data);
    res.status(HttpStatus.OK).send('Posted successfully');
  }
}
