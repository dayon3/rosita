import { BotService } from './bot/bot.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [BotService],
})
export class AppModule {}
