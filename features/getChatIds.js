import { doc } from '../app/doc.js';

export const chat_ids = [];

export const getChatIds = async () => {
    try {
        const sheet = doc.sheetsByIndex[0];
        const rows = await sheet.getRows();
        rows.forEach((row) => {
            const { id } = row.toObject();
            if (id) {
                const intId = parseInt(id);
                if (chat_ids.indexOf(intId) === -1) {
                    chat_ids.push(intId);
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
}