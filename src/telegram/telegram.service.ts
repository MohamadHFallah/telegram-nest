import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Bot, InputFile } from 'node-telegram-bot-api';
import { StartHandler } from './handler/start.handler';
import { MessageHandler } from './handler/message.handler';
import { readFile } from 'fs/promises';
import { TypedConfigService } from 'src/config/config.service';

@Injectable()
export class TelegramService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(TelegramService.name);
  private bot!: Bot;

  constructor(
    private readonly startHandler: StartHandler,
    private readonly messageHandler: MessageHandler,
    private readonly config: TypedConfigService,
  ) {}

  onModuleInit() {
    const API_ROOT = this.config.get('API_ROOT');
    const TELEGRAM_BOT_TOKEN = this.config.get('TELEGRAM_BOT_TOKEN');

    this.bot = new Bot(TELEGRAM_BOT_TOKEN, {
      apiRoot: API_ROOT,
    });

    this.registerHandlers();

    // Don't block Nest initialization
    void this.startBot();
  }

  private registerHandlers() {
    this.startHandler.register(this.bot);
    this.messageHandler.register(this.bot);
  }

  private async startBot() {
    try {
      await this.bot.startPolling();
      const me = await this.bot.api.getMe();
      this.logger.log(`Telegram bot started: @${me.username}`);
    } catch (error) {
      this.logger.error(
        'Failed to start Telegram bot',
        error instanceof Error ? error.stack : String(error),
      );
    }
  }

  async sendMessage(chatId: number, text: string) {
    return this.bot.api.sendMessage({
      chat_id: chatId,
      text,
    });
  }

  async sendPhoto(chatId: number, filePath: string) {
    const bytes = await readFile(filePath);
    return this.bot.api.sendPhoto({
      chat_id: chatId,
      photo: new InputFile(bytes),
    });
  }

  async sendDocument(chatId: number, filePath: string) {
    const bytes = await readFile(filePath);
    return this.bot.api.sendDocument({
      chat_id: chatId,
      document: new InputFile(bytes),
    });
  }

  async getBotInfo() {
    return this.bot.api.getMe();
  }

  onModuleDestroy() {
    if (this.bot) {
      this.bot.stop();
    }
  }
}
