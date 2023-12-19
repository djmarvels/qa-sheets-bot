import './express.js';
import { bot, createBot } from './bot.js';
import { spreadSheetInit } from './doc.js';
import getQuestions from '../features/getQuestions.js';
import fillQuestions from '../features/fillQuestions.js';


export const initBot = async () => {
    try {
        // Инициализируем подключение к таблице
        await spreadSheetInit();
        console.log('Table initialised.');

        // Получаем вопросы
        await getQuestions();
        await fillQuestions();

        // Создаём бота
        await createBot();

        // Запускаем бота
        bot.launch().then(() => {
        });
        console.log('Telegram bot is launched!');
    } catch (error) {
        console.log(error);
    }
};

await initBot();


