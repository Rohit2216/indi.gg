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
    expectedReturnDate: {
        type: Date,
        default: () => {
            const returnDate = new Date();
            returnDate.setDate(returnDate.getDate() + 14); // Assuming 14 days borrowing period
            return returnDate;
        },
    },
    returnDate: {
        type: Date,
    },
});

const BorrowedBook = mongoose.model('BorrowedBook', borrowedBookSchema);

module.exports = {BorrowedBook};
