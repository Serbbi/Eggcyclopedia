const mongoose = require('mongoose');

const eggSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    desire: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    published: {
        type: Date,
        default: Date.now
    }
}, { collection: 'Egg collection'})

module.exports = mongoose.model('Egg', eggSchema);