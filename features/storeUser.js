import { bot } from '../app/bot.js';
import setUserInfo from '../features/setUserInfo.js';

export default async ({ user_id, name }) => {
    try {
        const userInfo = {
            id: user_id,
            player: name,
            name: '',
            username: '',
        };
        const user = await bot.telegram.getChat(user_id);
        if (user) {
            if ((user.first_name && user.last_name) && (typeof user.first_name === 'string' && typeof user.last_name === 'string')) {
                userInfo.name = `${user.first_name} ${user.last_name}`;
            }
            if (user.username && typeof user.username === 'string') {
                userInfo.username = `@${user.username}`;
            }
        }
        await setUserInfo(userInfo);
    } catch (error) {
        console.log(error);
    }
};