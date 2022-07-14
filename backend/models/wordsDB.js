const mongoose = require("mongoose");

const wordsDBSchema = mongoose.Schema({
    wordsList: [String],
})

module.exports = mongoose.model("wordsDB", wordsDBSchema);