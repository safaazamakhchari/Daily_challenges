const  {readFileAsync}  = require('./readFileAsync');
const { writeFileAsync } = require('./writeFileAsync');

async function processFile(filePaths) {
  try{
    for (let filePath of filePaths) {
        let content = await readFileAsync(filePath)
        content = content.toUpperCase()
        content = content.split(" ").reverse().join(" ")
        let newFilePath = `${filePath.split(".")[0]}_new.txt`
        content = `${new Date().toISOString()} : ${content}`
        let result = await writeFileAsync(newFilePath, content)
        console.log(result)
    }
} catch (err){
    console.log(err)
}
}


module.exports = {
  processFile
};
