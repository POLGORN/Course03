const express = require('express');
const htmlParser = express.urlencoded({extended: false});
const fs = require('fs');
const { md_feed } = require('../models/model-feed');
const router = express.Router();

// добавим данные в файл
const get_record = (nameUser, feed, estimation) => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    let date_time = `${year}-${month}-${day}`;
    let time_date = `${hour}:${min}`;
	feed = feed.replace(/(\r\n|\n|\r)/gm, ' ');
    return `${date_time}|${time_date}|${nameUser}|${feed}|${estimation}\n`;
};


router.get('/', (req, res, next) => {
    res.render('feed', md_feed); // render view
});

router.post('/', htmlParser, (req, res) => {
    let record = get_record(req.body.name, req.body.feed, req.body.estimation); // находим по имени в шаблоне
    fs.appendFileSync('./private/feeds.csv', record);
    res.redirect("/"); // возвращаемся на главную
});

module.exports = router;
