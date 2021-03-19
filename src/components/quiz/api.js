import http from '@/helpers/http';
import answersByQuestion from '@/helpers/mock';
import {
    QUESTION_TEMPLATES
} from './helpers/constants';

export function getQuiz(quizId) {
    console.log(`GET http://quiz/${quizId}`);
    return http.mock({id: 1, title: 'Выбор парковки'}, 100);
}

export function getQuestions(quizId) {
    console.log(`GET http://quiz/questions?quizId=${quizId}`);
    return http.mock([
        {id: 1, title: 'Какой у вас тип объекта?'},
        {id: 2, title: 'Количество машиномест', template_id: QUESTION_TEMPLATES.RANGE},
        {id: 3, title: 'Количество въездов на территорию парковки', cover_url: './assets/quiz_1/9.jpg' },
        {id: 4, title: 'Количество выездов с территории парковки', cover_url: './assets/quiz_1/10.jpg'},
        {id: 5, title: 'Количество реверсивных проездов (сквозной въезд-выезд)'},
        {id: 6, title: 'Пользователи парковки', template_id: QUESTION_TEMPLATES.MULTIPLE},
        {id: 7, title: 'Сколько терминалов оплаты вам нужно?', cover_url: './assets/quiz_1/11.jpg'},
        {id: 8, title: 'Напишите, пожалуйста, адрес объекта'},
        {id: 9, title: 'Форма отправки данных', template_id: QUESTION_TEMPLATES.FORM},
        {
            id: 10, title: 'Спасибо!',
            description: 'Мы уже получили ваш запрос и скоро с вами свяжемся.',
            template_id: QUESTION_TEMPLATES.NOTIFICATION
        },
    ], 100);
}

export function getAnswers(questionId) {
    return http.mock(answersByQuestion[questionId], 100);
}

export function getHelps(testId) {
    if (testId === 666) {
        return http.mock([], 100);
    }
    return http.mock([
        {
            id: 1, template_id: 1, question_id: 1,
            title: 'Специалист RPS',
            cover_url: './assets/avatar.jpg',
            description: 'От типа объекта чаще всего зависит, какие задачи требуется решить.\nНапример, для бизнес-центров разграничить доступ для постоянных и гостей.\nА для спортивных комплексов организовать въезд по штрих-коду в билете.'
        },
        {
            id: 1, template_id: 1, question_id: 2,
            title: 'Специалист RPS',
            cover_url: './assets/avatar.jpg',
            description: 'Это поможет подобрать оптимальный состав для вашего оборудования.'
        },
        {
            id: 1, template_id: 1, question_id: 5,
            title: 'Специалист RPS',
            cover_url: './assets/avatar.jpg',
            description: 'Въезд и выезд осуществляются по одной полосе и через один шлагбаум.'
        },
        {
            id: 1, template_id: 1, question_id: 6,
            title: 'Специалист RPS',
            cover_url: './assets/avatar.jpg',
            description: 'Постоянные клиенты чаще всего это арендаторы бизнес-центров или их сотрудники. Для них можно настроить систему абонементов. А для разовых посетителей или гостей может быть настроена программа лояльности.'
        },
        {
            id: 1, template_id: 1, question_id: 8,
            title: 'Специалист RPS',
            cover_url: './assets/avatar.jpg',
            description: 'Может быть ваш объект уже есть в нашей базе и мы ранее готовили КП для Вас. Тогда его нужно будет просто обновить.'
        }
    ], 100);
}

export function sendResult(data) {
    const getElement = (name) => document.querySelectorAll(`meta[name=${name}]`)[0] || {};
    const propertyName = getElement('csrf-param').content || '';
    data[propertyName] = getElement('csrf-token').content || null;

    return http.post('//ru/site/send-quiz-message/', data);
}