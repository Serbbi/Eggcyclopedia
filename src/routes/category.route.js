const express = require('express');
const eggRouter = require('./egg.route');
const router = express.Router({mergeParams: true});
const Egg = require('../models/egg.model');
const Category = require('../models/category.model');

router.use('/:category/', eggRouter);

router.get('/:category', async (req, res) => {
    const category = await Category.findOne({name: req.params.category}).catch(err => console.log(err));
    if(!category) {
        res.status(404).send("Category not found");
    } else {
        res.render('pages/category', {
            category: category,
            eggs: await Egg.find({categoryId: category._id}).catch(err => console.log(err))
        });
    }
});

router.post('/:category', (req, res) => {
    const newEgg = new Egg(req.body);
    newEgg.save().then(r => res.json(r));
    Category.findOneAndUpdate({name: req.params.category}, {$push: {eggs: newEgg._id}}, {new: true})
        .then(r => res.json(r))
        .catch(err => console.log(err));
});

router.put('/:category', async (req, res) => {
    const categoryName = req.params.category
    Category.findOneAndUpdate({name: categoryName}, req.body, {new: true})
        .then(r => res.json(r))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
});

router.delete('/:category', async (req, res) => {
    Category.deleteOne({name: req.params.category})
        .then(r => res.json(r))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
});

module.exports = router;