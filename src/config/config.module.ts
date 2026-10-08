import { Global, Module } from '@nestjs/common';
import { TypedConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env.schema';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (rawConfig) => {
        const parsed = envSchema.safeParse(rawConfig);
        if (!parsed.success) {
          throw new Error(parsed.error.message);
        }

        if (!parsed.success) {
          console.error('❌ Invalid environment variables:');
          console.log((parsed as any).error);
          throw new Error('Invalid environment variables');
        }
        return parsed.data;
      },
    }),
  ],
  providers: [TypedConfigService],
  exports: [TypedConfigService],
})
export class AppConfigModule {}
