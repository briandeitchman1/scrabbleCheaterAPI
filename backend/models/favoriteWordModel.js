const mongoose = require('mongoose');

const favoriteWordSchema = mongoose.Schema({
    word: String
})

module.exports = mongoose.model('favoriteWord', favoriteWordSchema);