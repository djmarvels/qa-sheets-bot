import { doc } from '../app/doc.js';

export const questions = [];

export default async () => {
    const sheet = doc.sheetsByIndex[1];
    await sheet.loadCells('A1:B');

    for (let rowIndex = 0; rowIndex < 100; rowIndex++) {
        const key = sheet.getCell(rowIndex, 0).value;
        const value = sheet.getCell(rowIndex, 1).value;
        if (value === null || key === null) continue;
        const question = {};
        question[key] = value;
        questions.push(question);
    }

    return questions;
};