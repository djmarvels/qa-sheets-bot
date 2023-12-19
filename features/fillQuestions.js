import { doc } from '../app/doc.js';
import { questions } from './getQuestions.js';

export default async () => {
    try {
        const sheetAnswer = doc.sheetsByIndex[0];
        await sheetAnswer.loadCells();

        const questionKeys = questions.map(question => Object.keys(question)[0]);
        for (let index = 0, length = questionKeys.length; index < length; index++) {
            const questionKey = questionKeys[index];
            const cell = sheetAnswer.getCell(0, index + 5);
            if (cell) {
                cell.value = questionKey;
                await cell.save();
            }
        }
        console.log('Keys with questions successfully completed.');
    } catch (error) {
        console.log(error);
    }
};