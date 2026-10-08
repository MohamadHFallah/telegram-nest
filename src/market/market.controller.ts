import { Controller, Get } from '@nestjs/common';
import { MarketService } from './market.service';

@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get()
  findAll() {
    // this.marketService.getOilPrice('BRENT')
    return this.marketService.getGoldPrice();
  }
}
