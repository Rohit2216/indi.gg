const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    ISBN: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publishedYear: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = {Book};
