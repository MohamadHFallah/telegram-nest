export interface OilPriceResponse {
  name: string;
  interval: 'daily' | 'weekly' | 'monthly';
  unit: string;
  data: OilPriceDataPoint[];
}

interface OilPriceDataPoint {
  date: string;
  value: string;
}

export interface GoldPriceResponse {
  nominal: string;
  timestamp: string;
  price: string;
}
