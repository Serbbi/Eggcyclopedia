const express = require('express');
const router = express.Router({mergeParams: true});
const Egg = require('../models/egg.model');
const Category = require('../models/category.model');
let eggId = 0;

router.get('/:egg', async (req, res) => {
    const eggs = await Egg.find();
    const egg = eggs.find(egg => egg.name === req.params.egg);
    if(!egg) {
        res.status(404).send("Egg not found");
    } else {
        eggId = egg._id;
        res.render('pages/egg', {
            egg: egg._doc,
            eggs: eggs
        });
    }
});

router.put('/:egg', async (req, res) => {
    await Egg.findOneAndUpdate({name: req.params.egg}, req.body, {new: true})
        .then(egg => res.json(egg))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
});

router.delete('/:egg', async (req, res) => {
    await Egg.findOneAndDelete({name: req.params.egg})
        .then(egg => res.json(egg))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        });

    const category = await Category.findOne({name: req.params.category});
    category.eggs = category.eggs.filter(egg => egg.toString() !== eggId.toString());
    await category.save().catch(err => console.log(err));
});

module.exports = router;