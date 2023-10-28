let categories = require('../data/categories_data.json');
const helper = require('../utils/helper');
let id = categories.length;

function getCategories() {
    return new Promise((resolve, reject) => {
        if (categories.length === 0) {
            reject({
                message: 'no posts available',
                status: 202
            })
        }
        resolve(categories)
    });
}

function getCategory(name) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(categories, name)
            .then(category => resolve(category))
            .catch(err => reject(err))
    })
}

function postCategory(category) {
    return new Promise((resolve, reject) => {
        helper.isInArray(categories, category.name)
            .then(() => {
                categories.push({ id: id++, ...category });
                helper.writeJSONFile('./src/data/categories_data.json', categories);
                resolve(categories);
            })
            .catch(err => reject({
                message: 'category already exists',
                status: 409
            }))
    });
}

function updateCategory(name, category) {
    return new Promise((resolve, reject) => {
        let index = categories.findIndex((cat) => {
            return cat.name === name;
        });
        categories[index].name = category.name;
        resolve(categories[index]);
    });
}

function deleteCategory(name) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(categories, name)
            .then(() => {
                categories = categories.filter(p => p.name !== name)
                helper.writeJSONFile('./src/data/categories_data.json', categories)
                resolve(name)
            })
            .catch(err => reject(err))
    })
}

module.exports = { getCategories, postCategory, updateCategory, getCategory, deleteCategory };