import http from '../../helpers/http';
import {getAnswersMock, TEMPLATES} from './helpers/mock';

// quiz: id, title, description, cover_url, type_id, first_question_id
//   question: id, title, description, cover_url, template_id, next_question_id
//    answer: id, title, description, cover_url, template_id, property, value
// help: id, title, description, cover_url, answer_id, question_id

// type: id, title, description, cover_url
// template: id, title, description, cover_url

const answersByQuestion = {
    1: getAnswersMock(TEMPLATES.TILES, 'home', [
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
            '/assets/quiz_1/1.jpg',
            '/assets/quiz_1/2.jpg',
            '/assets/quiz_1/3.jpg',
            '/assets/quiz_1/4.jpg',
            '/assets/quiz_1/5.jpg',
            '/assets/quiz_1/6.jpg',
            '/assets/quiz_1/7.jpg',
            '/assets/quiz_1/8.jpg',
        ][index];
        return item;
    }),
    2: getAnswersMock(TEMPLATES.RANGE, 'cars', ['50', '1000']),
    3: getAnswersMock(TEMPLATES.SELECT, 'exit-in', ['1', '2', '3', '4', '5', 'Более']),
    4: getAnswersMock(TEMPLATES.SELECT, 'exit-out', ['1', '2', '3', '4', '5', 'Более']),
    5: getAnswersMock(TEMPLATES.SELECT, 'exit-reverse', ['нет', '1', '2', 'Более']),
    6: getAnswersMock(TEMPLATES.SELECT, 'users', [
        'Постоянные клиенты',
        'Разовые',
        'Гости постоянных клиентов',
        'Другое',
    ]),
    7: getAnswersMock(TEMPLATES.SELECT, 'terminals', ['1', '2', '3', '4', '5', 'Более']),
    8: getAnswersMock(TEMPLATES.TEXTAREA, 'address')('Город, улица и номер дома')(),
}

export function getQuiz(quizId) {
    console.log(`GET http://quiz/${quizId}`);
    return http.mock({id: 1, title: 'Выбор парковки'}, 100);
}

export function getQuestions(quizId) {
    console.log(`GET http://quiz/questions?quizId=${quizId}`);
    return http.mock([
        {id: 1, title: 'Какой у вас тип объекта?'},
        {id: 2, title: 'Количество машиномест'},
        {id: 3, title: 'Количество въездов на территорию парковки'},
        {id: 4, title: 'Количество выездов с территории парковки'},
        {id: 5, title: 'Количество реверсивных проездов (сквозной въезд-выезд)'},
        {id: 6, title: 'Пользователи парковки'},
        {id: 7, title: 'Сколько терминалов оплаты вам нужно?'},
        {id: 8, title: 'Напишите, пожалуйста, адрес объекта'},
    ], 100);
}

export function getAnswers(questionId) {
    console.log(`GET http://quiz/answers?questionId=${questionId}`);
    return http.mock(answersByQuestion[questionId], 100);
}