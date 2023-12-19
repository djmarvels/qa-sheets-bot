import { Telegraf, session, Scenes } from 'telegraf';
import { config } from 'dotenv';
config();

import Text from '../shared/text.js';
import stage from '../features/infoUserScene.js';
import createScenesQuestions from '../features/createQuestionScenes.js';
import { getChatIds, chat_ids } from '../features/getChatIds.js';

export let bot = null;

export const createBot = async () => {
    await getChatIds();

    bot = new Telegraf(process.env.TELEGRAM_API_TOKEN);

    bot.use(session());
    bot.use(stage.middleware());

    bot.start(async (ctx) => {
        ctx.reply(Text.helloUser);
        await ctx.scene.enter('INFO_USER');
    });

    const scenesQuestion = createScenesQuestions();
    const stageQuestion = new Scenes.Stage(scenesQuestion);
    bot.use(stageQuestion.middleware());

    bot.command('send', async (ctx) => {
        const sceneId = String(ctx.payload);
        try {
            await getChatIds();
            for (const chat_id of chat_ids) {
                await bot.telegram.sendMessage(chat_id, `Ваш пришёл новый вопрос!`, {
                    reply_markup: {
                        inline_keyboard: [
                            [ { text: "Принять", callback_data: sceneId } ],
                        ]
                    }
                });
            }
        } catch (error) {
            console.log(error);
            await ctx.reply('Ошибка. Вопрос не найден.');
        }
    });

    bot.on('callback_query',async (ctx) => {
        const sceneId = String(ctx.callbackQuery.data);
        try {
            await ctx.scene.enter(sceneId);
        } catch (error) {
            console.log(error);
        }
    })


    return bot;
};


export default bot;
