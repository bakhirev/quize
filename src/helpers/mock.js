import {ANSWER_TEMPLATES} from '../components/quiz/helpers/constants';

let answerId = 0;

function getAnswersMock(templateId, property, answers) {
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


// quiz: id, title, description, cover_url, type_id, first_question_id
//   question: id, title, description, cover_url, template_id, next_question_id, property
//    answer: id, title, description, cover_url, template_id, property, value
// help: id, title, description, cover_url, answer_id, question_id

// type: id, title, description, cover_url
// template: id, title, description, cover_url

const refQuestionAnswer = {
    1: getAnswersMock(ANSWER_TEMPLATES.TILES, 'home', [
        'Бизнес-центр',
        'Торговый центр / Рынок',
        'Отель',
        'Жилой комплекс',
        'Аэропорт / ЖД Вокзал',
        'Спорткомплекс / фитнес центр',
        'Загородный вэлнес-центр',
        'Логистический центр',
        'Другое',
    ]).map((item, index) => {
        item.cover_url = [
            './assets/quiz_1/1.jpg',
            './assets/quiz_1/2.jpg',
            './assets/quiz_1/3.jpg',
            './assets/quiz_1/4.jpg',
            './assets/quiz_1/5.jpg',
            './assets/quiz_1/6.jpg',
            './assets/quiz_1/7.jpg',
            './assets/quiz_1/8.jpg',
        ][index];
        return item;
    }),
    2: getAnswersMock(ANSWER_TEMPLATES.RANGE, 'cars', ['50-1000-525']),
    3: getAnswersMock(ANSWER_TEMPLATES.SELECT, 'exit-in', ['1', '2', '3', '4', '5', 'Более']),
    4: getAnswersMock(ANSWER_TEMPLATES.SELECT, 'exit-out', ['1', '2', '3', '4', '5', 'Более']),
    5: getAnswersMock(ANSWER_TEMPLATES.SELECT, 'exit-reverse', ['нет', '1', '2', 'Более']),
    6: getAnswersMock(ANSWER_TEMPLATES.CHECKBOX, 'users', [
        'Постоянные клиенты',
        'Разовые',
        'Гости постоянных клиентов',
        'Другое',
    ]),
    7: getAnswersMock(ANSWER_TEMPLATES.SELECT, 'terminals', ['1', '2', '3', '4', '5', 'Более']),
    8: getAnswersMock(ANSWER_TEMPLATES.TEXTAREA, 'address')('Город, улица и номер дома')(),
    9: getAnswersMock(ANSWER_TEMPLATES.SEND_FORM, 'email')('Некий текст')(),
};

refQuestionAnswer[8][0].description = refQuestionAnswer[8][0].title;
refQuestionAnswer[8][0].title = '';

export default refQuestionAnswer;
