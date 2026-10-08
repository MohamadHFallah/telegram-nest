import { Injectable, Logger } from '@nestjs/common';
import { Bot, Context } from 'node-telegram-bot-api';

@Injectable()
export class MessageHandler {
  private readonly logger = new Logger(MessageHandler.name);

  register(bot: Bot) {
    bot.on('message', (ctx) => {
      return this.handleMessage(ctx);
    });
  }

  private handleMessage(ctx: Context) {
    const userChatId = ctx.message?.from?.id;
    // const chatGroupId = ctx.message?.chat?.id;
    const message = ctx.message?.text;

    this.logger.log('userChatId ', userChatId);

    if (message?.startsWith('/')) {
      return;
    }
  }
}
