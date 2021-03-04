export default {
    id: 666,
    title: 'Выбор машины',
    first_question_id: 1,
    questions: [
        {
            id: 1, title: 'Какой движок?', answers: [
                {id: 1, title: 'Экономный', value: '1.4'},
                {id: 2, title: 'Мощный', value: '1.6'}
            ]
        },
        {
            id: 2, title: 'Какой кузов?', answers: [
                {id: 1, title: 'Седан', property: 'кузов', value: 'Седан'},
                {id: 2, title: 'Хэчбэк', property: 'кузов', value: 'Хэчбэк'},
                {id: 3, title: 'Джип', property: 'кузов', value: 'Джип'}
            ]
        },
        {
            id: 3, title: 'Какой цвет?', answers: [
                {id: 1, title: 'белый', property: 'color', value: '#FFFFFF'},
                {id: 2, title: 'черный', property: 'color', value: '#000000'},
                {id: 3, title: 'синий', property: 'color', value: '#0000FF'},
                {id: 4, title: 'красный', property: 'color', value: '#FF0000'}
            ]
        },
        { id: 4, title: 'Спасибо', template_id: 3 }
    ]
}