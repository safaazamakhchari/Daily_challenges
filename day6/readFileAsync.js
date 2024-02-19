const fs = require('node:fs');
async function readFileAsync(filePath){
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}
  


  module.exports =   {readFileAsync};