const express = require('express');
const router = express.Router();
const News = require('../models/news');
const {log} = require("debug");

router.all('*', (req, res, next) => {
    if(!req.session.admin){
        res.redirect('login');
        return;
    }

    next();
})

/* GET home page. */
router.get('/', (req, res) => {
    const newsData = new News({
        title: "Testowy",
        description: 'Opis'
    });
    newsData.save()
        .then(() => console.log('data saved'))
            .catch((err) => {
        console.log(err);
    });
    res.render('admin', { title: 'Admin' });
});

module.exports = router;
