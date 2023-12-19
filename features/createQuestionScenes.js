import { questions } from './getQuestions.js';

import questionScene from './questionScene.js';

export default () => {
    const scenes = [];

    const questionValues = questions.map(question => Object.values(question)[0]);
    const questionKeys = questions.map(question => Object.keys(question)[0]);
    for (let index = 0, length = questionKeys.length; index < length; index++) {
        const sceneId = questionKeys[index];
        const sceneText = questionValues[index];

        const scene = questionScene({
            sceneId, sceneText,
        });
        scenes.push(scene);
    }

    return scenes;
};