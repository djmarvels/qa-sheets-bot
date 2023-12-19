import { doc } from '../app/doc.js';
import fillQuestions from './fillQuestions.js';

export const hasNameInRow = ({ id, rows }) => {
    return rows.length > 0 ? rows.map(row => row.toObject()).findIndex((row) => {
        return (row.id === String(id));
    }) : -1;
};

export default async ({ id, name, username, player }) => {
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    const rowIndex = hasNameInRow({ id, rows });
    if (rowIndex === -1) {
        await sheet.addRow({
            id, name, role: 'player', username, player,
        });
    } else if (rows[rowIndex]) {
        const row = rows[rowIndex];
        row.set('player', player);
        await row.save();
    }

    await fillQuestions();
};