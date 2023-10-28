const express = require('express');
const categoryRouter = require("./category.route");
const router = express.Router();
const mainPageController = require('../../assets/js/mainPageController');
const category = require('../models/category.model');
const egg = require('../models/egg.model');

router.use('/', categoryRouter);

router.post('/', async (req, res) => {
    category.postCategory(req.body)
        .then(categories => {res.json(categories)})
        .catch(err => {
            res.status(err.status).json(err.message);
        })
})

router.get('/', async (req, res) => {
    res.render('pages/mainPage', {
        eggs: mainPageController.get3NewestEggs(await egg.getEggs().catch(err => {res.status(err.status).json(err.message)})),
        categories: await category.getCategories()
    });
})

module.exports = router;