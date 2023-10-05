const mongoose = require('mongoose');

const borrowedBookSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    borrowedDate: {
        type: Date,
        default: Date.now,
    },
    returnDate: {
        type: Date, // Updated to store the return date
    },
});

const BorrowedBook = mongoose.model('BorrowedBook', borrowedBookSchema);

module.exports = {BorrowedBook};
