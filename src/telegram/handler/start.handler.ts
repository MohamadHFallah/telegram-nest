import { Injectable } from '@nestjs/common';
import { Bot, Context } from 'node-telegram-bot-api';

@Injectable()
export class StartHandler {
  register(bot: Bot) {
    bot.command('start', (ctx) => {
      console.log(ctx);
      return this.handleStart(ctx);
    });
  }

  private async handleStart(ctx: Context) {
    await ctx.reply(`Hello there!`);
  }
}
