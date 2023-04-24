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
         News.find()
             .then((data) => {
                 console.log(data);
                 res.render('admin/index', { title: 'Admin', data });
             })
             .catch((err) => {
                 console.log(err);
             })




})
    .get('/news/add', (req,res) => {

    res.render('admin/news-form', {title: 'Add new news', body: {}, formErrors: {}});
    })
    .post('/news/add', (req,res) => {
        const body = req.body;
        const newsData = new News(body);
        const formErrors = newsData.validateSync();
        console.log(formErrors);
        newsData.save()
            .then(() => {
                res.redirect('/admin');
                console.log('data saved')})
            .catch((err) => {
                res.render('admin/news-form', {title: 'Add new news', formErrors, body});
                console.log(err);
            });


    })
    .get('/news/delete/:id', (req, res) => {
        News.findByIdAndDelete(req.params.id)
            .then(() =>{res.redirect('/admin');}

                )
            .catch((err) => {

            console.log(err);
        });
    });


module.exports = router;
