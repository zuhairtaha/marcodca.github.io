const fs = require('fs');

function getJSON() {
    return new Promise((resolve, reject) => {
        let test = ""
        const readingStream = fs.createReadStream(__dirname + "/football_team.json", "utf8");
        readingStream.on('data', (chunk) => {
            // console.log(chunk);
            test += chunk;
        })
        readingStream.on("end", () => {
            resolve(JSON.parse(test));
        })
    })
}

function writeJSON(data){
    const format = {footballteam: data}
    const writingStream = fs.createWriteStream(__dirname + "/football_team.json", "utf8");
    writingStream.write(JSON.stringify(format));
}


module.exports = {getJSON, writeJSON};