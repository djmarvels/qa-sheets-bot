import { doc } from '../app/doc.js';
import { hasNameInRow } from './setUserInfo.js';

export default async ({ sceneId, answerPlayer, user_id }) => {
    try {
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();

        const rowIndex = hasNameInRow({ id: user_id, rows });
        if (rowIndex > -1) {
            const row = rows[rowIndex];
            row.set(sceneId, answerPlayer);
            await row.save();
        }

        console.log(`Answer from user: ${user_id}, successful stored!`, { answerPlayer, sceneId });
    } catch (error) {
        console.log(error);
    }
};