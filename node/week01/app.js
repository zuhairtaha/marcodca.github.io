const fs = require('fs');
const arrayOfTexts = ['I Have a Dream.txt', 'Inaugrual Address.txt' ,'Strength and Decency.txt' ,'We Shall Fight on the Beaches.txt'];
const wordToSearch = 'and';

//Async
const util = require('util');
const readFile  = util.promisify(fs.readFile);
const startAsync = new Date();
let wordCountAsync = 0;

arrayOfTextsProm = arrayOfTexts.map((textFile)=>{
    return readFile(__dirname + '/texts/' + textFile , 'utf8') 
})

Promise.all([...arrayOfTextsProm]).then((text)=>{
    const splitedText = text.join("").split(" ");
    splitedText.forEach((word)=> {
        if (searchForWord(word, wordToSearch)){
            wordCountAsync++;
        }
    });
    const endAsync = new Date();
    console.log(`The word "${wordToSearch}" has been search asynchronously in ${arrayOfTexts.length} files and has been found a total of ${wordCountAsync} times in ${endAsync - startAsync} miliseconds.`);
})

//Sync
const startSync = new Date();
let wordCountSync = 0;

const allSyncTexts = arrayOfTexts.map((textFile)=>{
    return fs.readFileSync(__dirname + '/texts/' + textFile, 'utf8')
})

allSyncTexts.forEach((text)=>{
    const splitedText = text.split(" ");
    splitedText.forEach((word)=>{
        if (searchForWord(word, wordToSearch)){
            wordCountSync++;
        }
    })
})
const endSync = new Date();
console.log(`The word "${wordToSearch}" has been search synchronously in ${arrayOfTexts.length} files and has been found a total of ${wordCountSync} times in ${endSync - startSync} miliseconds.`);
//
function searchForWord(currentWord, wordToLook){
    return  currentWord.toLowerCase() === wordToLook ? true : false
}
