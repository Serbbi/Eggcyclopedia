const express = require('express');
const categoryRouter = require("./category.route");
const router = express.Router();
const Egg = require('../models/egg.model');
const Category = require('../models/category.model');

router.use('/', categoryRouter);

router.post('/', async (req, res) => {
    let newCategory = new Category(req.body);
    newCategory.save()
        .then(r => res.json(r))
        .catch(err => {
            res.status(err.status).json(err.message);
        });
})

router.get('/', async (req, res) => {
    res.render('pages/mainPage', {
        eggs: await Egg.find().sort({published: -1}).limit(3).catch(err => console.log(err)),
        categories: await Category.find().catch(err => {res.status(err.status).json(err.message)})
    });
})

module.exports = router;