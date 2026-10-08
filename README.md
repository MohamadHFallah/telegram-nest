# NestJS Telegram Bot Starter

A simple and reusable starter for integrating the **Telegram Bot API** with **NestJS**.

This repository uses [`node-telegram-bot-api`](https://github.com/yagop/node-telegram-bot-api) to provide an easy and type-safe way to build Telegram bots with NestJS.

## Features

* Telegram Bot API integration with NestJS
* TypeScript support
* Polling support
* Webhook support through `node-telegram-bot-api`
* Reusable `TelegramService`
* Message and command handlers
* Common Telegram send methods such as:

  * `sendMessage`
  * `sendPhoto`
* Environment variable validation with **Zod**
* Configurable environment variables

## Architecture

### `TelegramService`

`TelegramService` is the core service responsible for initializing the Telegram bot and registering handlers.

The bot uses **polling** to receive messages by default.

The service is exported, so it can be injected and used throughout your NestJS application.

### `MessageHandler`

Handles regular messages received from Telegram.

### `StartHandler`

Handles Telegram commands such as:

```text
/start
/help
```

Handlers are registered when the Telegram service is initialized:

```typescript
private registerHandlers() {
  this.startHandler.register(this.bot);
  this.messageHandler.register(this.bot);
}
```

## Example Use Case

The example application sends **daily gold and oil prices** to a Telegram user.

A cron job runs every day at noon:

```text
EVERY_DAY_AT_NOON
```

The prices are retrieved from **Alpha Vantage** and sent to the configured Telegram chat.

To test the example, add your Telegram `chat_id`.

You can find your `chat_id` inside the `MessageHandler` when a message is received from Telegram.

### Subscription Flow

For a production application, you can extend this example by:

1. Saving users' `chat_id` values in your database.
2. Allowing users to subscribe/unsubscribe.
3. Running the daily cron job.
4. Fetching all subscribed users.
5. Sending the daily prices to each user.

This turns the example into a simple Telegram notification system.

## Environment Variables

Environment variables are validated with **Zod** to make sure required configuration such as the Telegram bot token is available.

Example:

```env
TELEGRAM_BOT_TOKEN=your_bot_token
```

## Getting Started

```bash
npm install
npm run start:dev
```

Create a Telegram bot using **BotFather**, add your bot token to the environment variables, and start the NestJS application.

---

Built with **NestJS + TypeScript + node-telegram-bot-api**.
