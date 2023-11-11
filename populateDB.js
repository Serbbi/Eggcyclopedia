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

function addDataToDB() {
    console.log('Adding data to DB...');
    eggs.forEach(egg => {
        egg._id = new mongoose.Types.ObjectId(egg._id.$oid);
        egg.categoryId = new mongoose.Types.ObjectId(egg.categoryId.$oid);
        const d = new Date(egg.date.$date);
        if(d.getTime() !== d.getTime()) {
            egg.date = new Date(parseInt(egg.date.$date.$numberLong));
        } else {
            egg.date = d;
        }
        egg.published = new Date(egg.published.$date);
    });
    categories.forEach(category => {
        category._id = new mongoose.Types.ObjectId(category._id.$oid);
        category.eggs = category.eggs.map(egg => new mongoose.Types.ObjectId(egg.$oid));
    });
    Egg.create(eggs)
        .then(() => {
            console.log('Eggs added to DB');
            Category.create(categories)
                .then(() => {
                    console.log('Categories added to DB');
                    mongoose.disconnect();
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}