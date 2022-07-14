const fs = require('fs');
const { Stream } = require('stream');
const path = require('path')
const words = require('./dictionary.json')

const Words = {}
console.log("in Word list file")
const map = new Map();
// reads in text file of around 300k legal scrabble words from Collins Scrabble Words 2019
// puts all the words into map with the key being the sorted letters and value is an array of words
// that can be made from the letters
function createWordMap() {
    console.log("in Word list creator")
    //const words = fs.readFileSync('backend/controllers/wordList2.txt', 'utf-8').toString().split('\r\n');
    //const words = fs.readFileSync(path.join(__dirname, 'wordList.txt'), 'utf-8').toString().split('\r\n');
    // // const stream = fs.createReadStream('backend/controllers/wordList2.txt', 'utf-8')
    // const stream = fs.createReadStream(path.join(__dirname, 'wordList2.txt'), 'utf-8')
    // stream.on('data', (chunk) => {
    //      console.log(chunk, "yo")
    // })


    console.log(words[1], words[2])
    for (let i = 0; i < words.length; i++) {

        let sortedWord = words[i].split('').sort().join("");
        if (!map.has(sortedWord)) {
            let arr = [words[i]];
            map.set(sortedWord, arr);
        } else {
            map.get(sortedWord).push(words[i])
            //console.log(sortedWord)
        }
    }
    // console.log(map.size)
    console.log(map.get("aoz"))


}


createWordMap();
Words.map = map;
// takes a string and returns all the words can can be made from the letters
Words.getWords = function getAllWords(word) {
    //createWordMap();
    //Words.map = map;
    console.log("in get words")
    if (!word) {
        return ''
    }
    word = word.toLowerCase();
    const sortedWord = word.split('').sort().join('');
    const searchedLetters = []
    let scrabbleAnswers = []
    searchedLetters.concat(map.get(sortedWord));
    findShorterWords(map, sortedWord, searchedLetters, scrabbleAnswers)
    return scrabbleAnswers;
}
// recursively finds all different letter combonations and
// gets the words that can be made by them and returns an array of them
function findShorterWords(map, newKey, searchedLetters, scrabbleAnswers) {
    if (newKey <= 0) {
        return;
    }
    if (map.get(newKey)) {
        tempWords = map.get(newKey);
        for (let i = 0; i < tempWords.length; i++) {
            scrabbleAnswers.push(tempWords[i]);
        }
    }
    for (let i = 0; i < newKey.length; i++) {
        let cutKey = newKey.substring(0, i) + newKey.substring(i + 1, newKey.length);
        if (!searchedLetters.includes(cutKey)) {
            searchedLetters.push(cutKey)
            findShorterWords(map, cutKey, searchedLetters, scrabbleAnswers);
        }
    }
}
console.log(map.get("dgo"))

//console.log(Words.getWords("begin"))
module.exports = Words;