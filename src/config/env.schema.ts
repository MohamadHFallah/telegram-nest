import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  TELEGRAM_BOT_TOKEN: z.string().min(1, 'TELEGRAM_BOT_TOKEN is required'),
  ALPHA_VANTAGE_KEY: z.string().min(1, 'ALPHA_VANTAGE_KEY is required'),
  API_ROOT: z.string().default('https://api.telegram.org'),
});

export type Env = z.infer<typeof envSchema>;
