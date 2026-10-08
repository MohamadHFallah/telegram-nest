This code,
If you can combine telegram bot api with nestjs framwork for
once initial into nestjs, you can use this repo for your application.

in this repo i add node-telegram-bot-api library for easy connect to telrgram and it has typesafe.
at first.

TelegramService is a heart core for creating start teleram bot and we use polling method for getting
message. also this node-telegram-bot-api library support long pooling and webhook methods.
also i add send methods to otleegram like sendMessage, sendphoto to teltegram,
and you can use it if you can need it.

MessageHandler, StartHandler are two classes that they handles messages from telegram and
StartHandler is a command speific message like /start or .help and etc.
these two classes register to registerHandlers

```
  private registerHandlers() {
    this.startHandler.register(this.bot);
    this.messageHandler.register(this.bot);
  }
```

I export TelegramService and use can access to class everywhere.


my simple secunaro is this, send daily oil and gold prices send to user from bot. 
for daily apporach we use cronjob that send EVERY_DAY_AT_NOON give price from alphavantage
please add your chat_id from telegram. please find chat_id from handleMessage class. for give advice,
you can create this flow, add user chat_id to db and give suscribe users in daily cron job and send prices to
 these users.




 top: I use zod validation and configurable env for checking env entry like telegram token and ...