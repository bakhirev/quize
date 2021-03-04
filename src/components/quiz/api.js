import http from '@/helpers/http';
import answersByQuestion from '@/helpers/mock';
import {
    QUESTION_TEMPLATES
} from './helpers/constants';

// quiz: id, title, description, cover_url, type_id, first_question_id
//   question: id, title, description, cover_url, template_id, next_question_id, property
//    answer: id, title, description, cover_url, template_id, property, value
// help: id, title, description, cover_url, answer_id, question_id

// type: id, title, description, cover_url
// template: id, title, description, cover_url

export function getQuiz(quizId) {
    console.log(`GET http://quiz/${quizId}`);
    return http.mock({id: 1, title: 'Выбор парковки'}, 100);
}

export function getQuestions(quizId) {
    console.log(`GET http://quiz/questions?quizId=${quizId}`);
    return http.mock([
        {id: 1, title: 'Какой у вас тип объекта?'},
        {id: 2, title: 'Количество машиномест'},
        {id: 3, title: 'Количество въездов на территорию парковки', cover_url: './assets/quiz_1/9.jpg' },
        {id: 4, title: 'Количество выездов с территории парковки', cover_url: './assets/quiz_1/10.jpg'},
        {id: 5, title: 'Количество реверсивных проездов (сквозной въезд-выезд)'},
        {id: 6, title: 'Пользователи парковки', cover_url: './assets/quiz_1/11.jpg'},
        {id: 7, title: 'Сколько терминалов оплаты вам нужно?'},
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
    console.log(`GET http://quiz/answers?questionId=${questionId}`);
    return http.mock(answersByQuestion[questionId], 100);
}

export function getHelps(testId) {
    console.log(`GET http://quiz/help?testId=${testId}`);
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
    console.log(`POST http://quiz/result`);
    console.dir(data);
    return http.mock({
        status: 'ok'
    }, 100);
}