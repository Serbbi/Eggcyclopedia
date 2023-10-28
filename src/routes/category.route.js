const express = require('express');
const eggRouter = require('./egg.route');
const router = express.Router({mergeParams: true});
const categories = require('../models/category.model');
const eggs = require('../models/egg.model');
const Egg = require('../models/newegg.model');

router.use('/:category/', eggRouter);

router.get('/:category', async (req, res) => {
    const category = await categories.getCategory(req.params.category).catch(err => console.log(err));
    if(!category) {
        res.status(404).send("Category not found");
    } else {
        res.render('pages/category', {
            category: category,
            eggs: await eggs.getEggsByCategoryId(category.id).catch(err => console.log(err))
        });
    }
});

router.post('/:category', (req, res) => {
    const newEgg = new Egg(req.body);
    console.log(newEgg);
    newEgg.save().then(r => res.json(r));
});

router.put('/:category', async (req, res) => {
    const categoryName = req.params.category
    await categories.updateCategory(categoryName, req.body)
        .then(post => res.json({
            message: `The category #${categoryName} has been updated`,
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
});

router.delete('/:category', async (req, res) => {
    await categories.deleteCategory(req.params.category)
        .then(name => res.json({
            message: `The category ${name} has been deleted`
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
});

module.exports = router;