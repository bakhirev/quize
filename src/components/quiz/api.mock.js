import { getAnswers, TEMPLATES } from './helpers/mock';

export default {
    TEST: { id: 1, title: 'Выбор парковки' },
    QUESTIONS: [
        {id: 1, title: 'Какой у вас тип объекта?'},
        {id: 2, title: 'Количество машиномест'},
        {id: 3, title: 'Количество въездов на территорию парковки'},
        {id: 4, title: 'Количество выездов с территории парковки'},
        {id: 5, title: 'Количество реверсивных проездов (сквозной въезд-выезд)'},
        {id: 6, title: 'Пользователи парковки'},
        {id: 7, title: 'Сколько терминалов оплаты вам нужно?'},
        {id: 8, title: 'Напишите, пожалуйста, адрес объекта'},
    ],
    ANSWERS: {
        1: getAnswers(TEMPLATES.TILES, 'home', [
            'Бизнес-центр',
            'Торговый центр / Рынок',
            'Отель',
            'Жилой комплекс',
            'Аэропорт / ЖД Вокзал',
            'Спорткомплекс / фитнес центр',
            'Загородный вэлнес-центр',
            'Логистический центр',
            'Другое',
        ]),
        2: getAnswers(TEMPLATES.RANGE, 'cars', [ '50', '1000' ]),
        3: getAnswers(TEMPLATES.SELECT, 'exit-in', [ '1', '2', '3', '4', '5', 'Более' ]),
        4: getAnswers(TEMPLATES.SELECT, 'exit-out', [ '1', '2', '3', '4', '5', 'Более' ]),
        5: getAnswers(TEMPLATES.SELECT, 'exit-reverse', [ 'нет', '1', '2', 'Более' ]),
        6: getAnswers(TEMPLATES.SELECT, 'users', [
            'Постоянные клиенты',
            'Разовые',
            'Гости постоянных клиентов',
            'Другое',
        ]),
        7: getAnswers(TEMPLATES.SELECT, 'terminals', [ '1', '2', '3', '4', '5', 'Более' ]),
        8: getAnswers(TEMPLATES.TEXTAREA, 'address', 'Город, улица и номер дома'),
    },
};
