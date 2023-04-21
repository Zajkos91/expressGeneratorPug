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
router
    .get('/', (req, res) => {

    res.render('admin/index', { title: 'Admin' });
})
    .get('/news/add', (req,res) => {
    res.render('admin/news-form', {title: 'Add new news', body: {}, formErrors: {}});
    })
    .post('/news/add', (req,res) => {
        const body = req.body;
        const newsData = new News(body);
        const formErrors = newsData.validateSync();

        newsData.save()
            .then(() => console.log('data saved'))
            .catch((err) => {
                console.log(err);
            });

        res.render('admin/news-form', {title: 'Add new news', formErrors, body});
    });


module.exports = router;
