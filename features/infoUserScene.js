import { Scenes } from 'telegraf';

import Text from '../shared/text.js';
import { getUserId } from '../shared/helpers.js';

import storeUser from '../features/storeUser.js';

const contactDataWizard = new Scenes.WizardScene(
    'INFO_USER', // first argument is Scene_ID, same as for BaseScene
    async (ctx) => {
        await ctx.reply(Text.whatIsYourName);
        ctx.wizard.state.infoUser = {};
        return ctx.wizard.next();
    },
    async (ctx) => {
        // validation example
        if (ctx.message.text.length < 2) {
            await ctx.reply(Text.badName);
            return;
        }
        ctx.wizard.state.infoUser.user_id = getUserId(ctx.message);
        ctx.wizard.state.infoUser.name = ctx.message.text;
        await ctx.reply(Text.thankYouFillingName);
        await storeUser(ctx.wizard.state.infoUser);
        return ctx.scene.leave();
    },
);

export default new Scenes.Stage([
    contactDataWizard,
]);