const express = require('express');
const eggs = require('../models/egg.model');
const router = express.Router({mergeParams: true});

router.get('/:egg', async (req, res) => {
    const egg = await eggs.getEggByName(req.params.category, req.params.egg).catch(err => console.log(err));
    if(!egg) {
        res.status(404).send("Egg not found");
    } else {
        res.render('pages/egg', {
            egg: egg
        });
    }
});

router.put('/:egg', async (req, res) => {
    const eggName = req.params.egg
    await eggs.updateEgg(eggName, req.body)
        .then(post => res.json(post))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
});

router.delete('/:egg', async (req, res) => {
    await eggs.deleteEgg(req.params.egg)
        .then(name => res.json({
            message: `The egg ${name} has been deleted`
        }))
        .catch(err => {
            if (err.status) {
                res.status(err.status).json({ message: err.message })
            }
            res.status(500).json({ message: err.message })
        })
});

module.exports = router;