const express = require('express');
const categoryRouter = require("./category.route");
const router = express.Router();
const category = require('../models/category.model');
const Egg = require('../models/newegg.model');

router.use('/', categoryRouter);

router.post('/', async (req, res) => {
    category.postCategory(req.body)
        .then(categories => {res.json(categories)})
        .catch(err => {
            res.status(err.status).json(err.message);
        })
})

router.get('/', async (req, res) => {
    let eggs =  await Egg.find().sort({date: -1}).limit(3).catch(err => {res.status(err.status).json(err.message)})
    eggs.forEach(egg => {
        egg.date = egg.date.toLocaleDateString();
    })
    res.render('pages/mainPage', {
        eggs: eggs,
        categories: await category.getCategories()
    });
})

module.exports = router;