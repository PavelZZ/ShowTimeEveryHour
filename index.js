const { Telegraf } = require('telegraf')
const schedule = require('node-schedule')

require('dotenv').config()
const { commands } = require('./commands')
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => console.log(ctx.message))
bot.help((ctx) => ctx.reply(commands))

bot.command('showTime', async (ctx) => {
    interval_id = schedule.scheduleJob('5 * * * * *', async () => {
        const currentDate = new Date()
        const currentHour = currentDate.getHours()
        const currentMinute = currentDate.getMinutes()
        if (currentHour === currentMinute) {
            const showMessage = currentDate.getHours() < 10 ? `0${currentHour}:0${currentMinute}` :
                currentHour + ':' + currentMinute
            await ctx.telegram.sendMessage('-1001777424156', showMessage)
        }
    })
})
bot.command('dontShowTime', (_ctx) => {
    schedule.gracefulShutdown()
})
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))