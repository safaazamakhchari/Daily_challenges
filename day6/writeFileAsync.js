const fs = require('node:fs');
async function writeFileAsync(filePath, content){
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, content, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve("success")
            }
        })
    })
}

module.exports = {writeFileAsync}


