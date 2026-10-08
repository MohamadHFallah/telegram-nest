import { Injectable } from '@nestjs/common';
import got from 'got';
import { GoldPriceResponse, OilPriceResponse } from './types';
import { TypedConfigService } from 'src/config/config.service';

@Injectable()
export class MarketService {
  private readonly alphaVantageKey: string;

  constructor(private readonly config: TypedConfigService) {
    this.alphaVantageKey = this.config.get('ALPHA_VANTAGE_KEY');
  }
  async getGoldPrice(): Promise<GoldPriceResponse> {
    const url = `https://www.alphavantage.co/query?function=GOLD_SILVER_SPOT&symbol=GOLD&apikey=${this.alphaVantageKey}`;
    const response = await got.get(url).json<GoldPriceResponse>();
    return response;
  }

  async getOilPrice(symbol: 'WTI' | 'BRENT' = 'WTI'): Promise<number> {
    const url = `https://www.alphavantage.co/query?function=${symbol}&interval=daily&apikey=${this.alphaVantageKey}`;
    const response = await got.get(url).json<OilPriceResponse>();
    return parseFloat(response.data[0].value);
  }
}
