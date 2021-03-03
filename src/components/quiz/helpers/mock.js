let answerId = 0;

export function getAnswersMock(templateId, property, answers) {
    const allAnswers = [];
    const getAnswer = (title, value) => ({
        id: answerId++,
        title,
        property,
        template_id: templateId,
        value: value || title,
    });
    const generator = (title, value) => {
        if (!title) return allAnswers;
        if (title instanceof Array) {
            title.forEach((item) => {
                if (item instanceof Array) allAnswers.push(getAnswer(item[0], item[1]));
                else allAnswers.push(getAnswer(item));
            });
            return generator;
        }
        allAnswers.push(getAnswer(title, value));
        return generator;
    }
    if (answers) return generator(answers)()
    return generator;
}

export const TEMPLATES = {
    TILES: 1,
    RANGE: 2,
    SELECT: 3,
    TEXTAREA: 4,
};
