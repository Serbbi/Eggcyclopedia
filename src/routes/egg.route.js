const express = require('express');
const router = express.Router({mergeParams: true});
const Egg = require('../models/egg.model');

router.get('/:egg', async (req, res) => {
    const egg = await Egg.findOne({name: req.params.egg});
    if(!egg) {
        res.status(404).send("Egg not found");
    } else {
        res.render('pages/egg', {
            egg: egg._doc
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
});

module.exports = router;