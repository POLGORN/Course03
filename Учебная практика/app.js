// подключение зависимостей
const express = require('express');
const params = require('./private/config.json').debug;

// настройка приложения
const app = express();
app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// routing - маршрутизация
const router_index = require('./routes/index');
const router_feed = require('./routes/feed');
app.use('/', router_index);
app.use('/feed', router_feed);

// запуск приложения
app.listen(params.port, params.hostname, () => {
    console.log(`> ${params.hostname}:${params.port}/\n> to stop: Ctrl+C`);
});



// добавить поле "Оценка продукта" (добавить отдельный, самый правый столбец таблицы)
// разделить поля дата и время (на отдельные столбцы таблицы)
// добавить возможность сортировки отзывов на главной странице приложения по оценке продукта
// изменить на свой вкус дизайн фона, кнопок, шрифтов, цветовое оформление...