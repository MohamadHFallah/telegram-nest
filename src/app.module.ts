import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { MarketModule } from './market/market.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { AppConfigModule } from './config/config.module';

@Module({
  imports: [TelegramModule, MarketModule, SchedulerModule, AppConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
