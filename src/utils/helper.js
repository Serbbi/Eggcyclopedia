const fs = require('fs')

function mustBeInArray(categories, name) {
    return new Promise((resolve, reject) => {
        const row = categories.find(r => r.name === name)
        if (!row) {
            reject({
                message: 'ID is not good',
                status: 404
            })
        }
        resolve(row)
    })
}

function isInArray(categories, name) {
    return new Promise((resolve, reject) => {
        const row = categories.find(r => r.name === name);
        if (!row) {
            resolve();
        }
        reject();
    })
}

function writeJSONFile(filename, content) {
    fs.writeFile(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    });
}

module.exports = { writeJSONFile, mustBeInArray, isInArray };