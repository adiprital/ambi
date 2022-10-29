const path = require('path');
const fs = require('fs'); // file system

const readJsonFile = () => {
    let products_string = fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'));
    return JSON.parse(products_string);
}

const writeToJsonFile = (filename, products) => {
    return new Promise((resolve, reject) => {
        fs.writeFileSync(path.join(__dirname, '..', 'data', `${filename}.json`), JSON.stringify(products), 'utf8', async()=>{
            console.log(`success write to file`);
            resolve();
        });
    })
}

module.exports = {
    readJsonFile,
    writeToJsonFile
}