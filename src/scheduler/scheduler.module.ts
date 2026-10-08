import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './scheduler.service';
import { MarketService } from 'src/market/market.service';
import { TelegramModule } from 'src/telegram/telegram.module';

@Module({
  providers: [SchedulerService, MarketService],
  imports: [ScheduleModule.forRoot(), TelegramModule],
})
export class SchedulerModule {}
