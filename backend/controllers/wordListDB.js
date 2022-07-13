const fs = require('fs')

const Words = {}

const map = new Map();
// reads in text file of around 300k legal scrabble words from Collins Scrabble Words 2019
// puts all the words into map with the key being the sorted letters and value is an array of words
// that can be made from the letters
function createWordMap() {
    const words = fs.readFileSync('backend/controllers/wordList.txt', 'utf-8').toString().split('\r\n');
    for (let i = 0; i < words.length; i++) {
        let sortedWord = words[i].split('').sort().join("");
        if (!map.has(sortedWord)) {
            let arr = [words[i]];
            map.set(sortedWord, arr);
        } else {
            map.get(sortedWord).push(words[i])
        }
    }
}

createWordMap();
Words.map = map;
// takes a string and returns all the words can can be made from the letters
Words.getWords = function getAllWords(word) {
    if (!word) {
        return ''
    }
    word = word.toUpperCase()
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
console.log(Words.map.get("DGO"))

//console.log(Words.getWords("begin"))
module.exports = Words;