import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { MessageHandler } from './handler/message.handler';
import { StartHandler } from './handler/start.handler';

@Module({
  providers: [TelegramService, MessageHandler, StartHandler],
  exports: [TelegramService],
})
export class TelegramModule {}
