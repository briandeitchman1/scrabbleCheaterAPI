const asyncHandler = require("express-async-handler");
const FavoriteWord = require("../models/favoriteWordModel")
const WordsDB = require("../models/wordsDB");
const Words = require("./wordListDB");



// @desc Get words
// @route Get /api/scrabble
// @access public
const getWords = asyncHandler(async (req, res) => {
    let list = Words.getWords(req.query.letters)
    if (!list) {
        res.status(400).json({})
        // throw new Error('No words found')
    }
    console.log(list)
    res.status(200).json({ list })
})
// @desc Get Favorite word
// @route Get /api/scrabble/fav
// @access public
const getFavWords = asyncHandler(async (req, res) => {
    favoriteWords = await FavoriteWord.find({})
    res.status(200).json(favoriteWords)
})
// @desc Add word to favorites list
// @route POST /api/scrabble
// @access private
const addFavoriteWord = asyncHandler(async (req, res) => {

    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field');
    }
    const favoriteWord = await FavoriteWord.create({
        word: req.body.text
    })
    res.status(200).json({ favoriteWord })
})
// @desc update word in favorites list
// @route update /api/scrabble/:id
// @access private
const updateFavoriteWord = asyncHandler(async (req, res) => {
    const favoriteWord = await FavoriteWord.findById(req.params.id)
    if (!favoriteWord) {
        res.status(400)
        throw new Error('Word not found')
    }
    favoriteWord.word = req.body.text;
    favoriteWord.save();
    res.status(200).json({ message: favoriteWord })
})
// // @desc  delete word in favorites list
// // @route DELETE /api/scrabble/:id
// // @access private
const deleteFavoriteWord = asyncHandler(async (req, res) => {
    //const favoriteWord = await FavoriteWord.findById(req.params.id)
    const favoriteWord = await FavoriteWord.deleteMany({ word: req.body.text })
    if (!favoriteWord) {
        res.status(400)
        throw new Error('Word not found')
    }
    // await favoriteWord.remove()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getWords,
    addFavoriteWord,
    updateFavoriteWord,
    deleteFavoriteWord,
    getFavWords

}