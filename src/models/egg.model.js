let eggs = require('../data/eggs_data.json');
const helper = require('../utils/helper');

function getEggs() {
    return new Promise((resolve, reject) => {
        resolve(eggs)
    });
}

function getEggByName(category, name) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(eggs, name)
            .then(egg => resolve(egg))
            .catch(err => reject(err))
    });
}

function getEggsByCategoryId(id) {
    return new Promise((resolve, reject) => {
        const filteredEggs = eggs.filter((egg) => {
            return egg.categoryId === id;
        });
        resolve(filteredEggs)
    });
}

function postEgg(egg) {
    return new Promise((resolve, reject) => {
        eggs.push({...egg, "published": new Date()});
        helper.writeJSONFile('./src/data/eggs_data.json', eggs);
        resolve(eggs);
    });
}

function updateEgg(name, egg) {
    return new Promise((resolve, reject) => {
        let index = eggs.findIndex((cat) => {
            return cat.name === name;
        });
        eggs[index].name = egg.name || eggs[index].name;
        eggs[index].description = egg.description || eggs[index].description;
        eggs[index].image = egg.image || eggs[index].image;
        eggs[index].desire = egg.desire || eggs[index].desire;
        eggs[index].date = egg.date || eggs[index].date;
        resolve(eggs[index]);
    });
}

function deleteEgg(name) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(eggs, name)
            .then(() => {
                eggs = eggs.filter((egg) => {
                    return egg.name !== name;
                });
                helper.writeJSONFile('./src/data/eggs_data.json', eggs);
                resolve(name);
            })
            .catch(err => reject(err))
    });
}

module.exports = { getEggs, postEgg, updateEgg, getEggsByCategoryId, getEggByName, deleteEgg };