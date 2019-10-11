const Telegraf = require('telegraf');
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const config = require('./config');

const bot = new Telegraf(config.bot_token);

bot.use(Telegraf.log())

const init = async () => {
  const me = await bot.telegram.getMe();
  bot.options.username = me.username;
  console.log(`Initialized with nickname ${me.username}!`);
};

const keyboard = Markup.inlineKeyboard([
  Markup.urlButton('❤️', 'https://devnur.me'),
  Markup.callbackButton('Delete', 'delete')
])

const main = async () => {
  await init();

  bot.start((ctx) => {
    const username = ctx.update.message.from.username;
    ctx.reply(`ShaihBot welcomes you dear @${username} ❤️!`);
  });

  bot.help((ctx) => ctx.reply('Help message'));

  bot.command('lol', ({ reply }) => {
    return reply('lolkek', Markup
      .keyboard([
        ['🔍 Search', '😎 Popular'],
        ['☸ Setting', '📞 Feedback'],
        ['📢 Ads', '⭐️ Rate us', '👥 Share']
      ])
      .oneTime()
      .resize()
      .extra()
    )
  })

  bot.hears('🔍 Search', ctx => ctx.reply('Yay!'))
  bot.hears('📢 Ads', ctx => ctx.reply('Free hugs. Call now!'))

  bot.on('message', (ctx) => {
    ctx.message.text = `You said "${ctx.message.text}"`;
    ctx.telegram.sendCopy(ctx.chat.id, ctx.message, Extra.markup(keyboard));
  });

  bot.action('delete', ({ deleteMessage }) => deleteMessage());

  bot.launch();
};

main();
