const express = require("express");
const router = express.Router();
const { getWords, addFavoriteWord, updateFavoriteWord, deleteFavoriteWord, getFavWords } = require("../controllers/scrabbleController")

router.route('/words').get(getWords)
router.route('/').post(addFavoriteWord);
router.route('/').get(getWords).post(addFavoriteWord);
router.route('/').put(updateFavoriteWord).delete(deleteFavoriteWord);
router.route('/fav').get(getFavWords)


module.exports = router;