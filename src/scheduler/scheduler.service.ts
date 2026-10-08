import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MarketService } from 'src/market/market.service';
import { TelegramService } from 'src/telegram/telegram.service';
import { setTimeout as sleep } from 'node:timers/promises';

@Injectable()
export class SchedulerService {
  constructor(
    private marketService: MarketService,
    private telegramService: TelegramService,
  ) { }

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  async sendDailyPrices() {
    const gold = await this.marketService.getGoldPrice();
    await sleep(3000);
    const oil = await this.marketService.getOilPrice('BRENT');

    const message = `📊 
        Daily Market Prices\n\n🥇 
        Gold: $${gold.price}/oz\n
        🛢️ WTI Crude: $${oil}/bbl`;

    // TODO: Retrieve the actual chat ID from a configuration source or database
    const chatId = 0; // Replace with your actual chat ID

    await this.telegramService.sendMessage(chatId, message);
  }
}
