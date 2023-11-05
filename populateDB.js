require('dotenv').config();
const { mongoose } = require('mongoose');
const Egg = require('./src/models/egg.model');
const Category = require('./src/models/category.model');
const eggs = require('./data/Eggtopia.Egg collection.json');
const categories = require('./data/Eggtopia.Category collection.json');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        addDataToDB();
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });

// not finished
function addDataToDB() {
    console.log('Adding data to DB...');
    Egg.create(eggs)
        .then(() => {
            console.log('Eggs added to DB');
        })
        .catch(err => console.log(err));
    Category.create(categories)
        .then(() => {
            console.log('Categories added to DB');
        })
        .catch(err => console.log(err));

    mongoose.disconnect();
}