import {Scenes} from 'telegraf';

import storeAnswer from '../features/storeAnswer.js';

import { getUserId } from '../shared/helpers.js';
import Text from '../shared/text.js';

export default ({ sceneId, sceneText }) => new Scenes.WizardScene(
    sceneId,
    async (ctx) => {
        await ctx.editMessageText(`${sceneText}\n\nНапишите свой ответ и отправьте боту!`);
        return ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.message.text.length < 1) {
            await ctx.reply(Text.invalidAnswer);
            return;
        }
        await storeAnswer({
            sceneId,
            answerPlayer: ctx.message.text,
            user_id: getUserId(ctx.message)
        });
        await ctx.reply(Text.successAnswer);
        return ctx.scene.leave();
    },
);