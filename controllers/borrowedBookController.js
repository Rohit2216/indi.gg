const {BorrowedBook} = require('../models/borrowModel');
const {Book} = require('../models/bookModels');

exports.borrowBook = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        // Check if the user has already borrowed 3 books
        const borrowedBooksCount = await BorrowedBook.countDocuments({ userId });
        if (borrowedBooksCount >= 3) {
            return res.status(400).json({ error: 'You have already borrowed 3 books.' });
        }

        // Check if the book is available for borrowing
        const book = await Book.findOne({ _id: bookId, quantity: { $gt: 0 } });
        if (!book) {
            return res.status(400).json({ error: 'Book not available for borrowing.' });
        }

        // Set the return date to 14 days from the borrowing date
        const returnDate = new Date();
        returnDate.setDate(returnDate.getDate() + 14); // Assuming 14 days borrowing period

        // Update book quantity and create a borrowed book record
        book.quantity -= 1;
        await book.save();

        const borrowedBook = new BorrowedBook({
            userId,
            bookId,
            returnDate,
        });
        await borrowedBook.save();

        res.status(201).json({ message: 'Book borrowed successfully.', returnDate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.returnBook = async (req, res) => {
    try {
        const { borrowedBookId,returnDate } = req.body;

        // Find the borrowed book record
        const borrowedBookret = await BorrowedBook.findById(borrowedBookId);
        // console.log(borrowedBookret)
        if (!borrowedBookret) {
            return res.status(404).json({ error: 'Borrowed book record not found.' });
        }

        // Update the return date
        borrowedBookret.returnDate = returnDate;
        await borrowedBookret.save();

        // Update book quantity and remove the borrowed book record
        const book = await Book.findById(borrowedBookret.bookId);
        if (book) {
            book.quantity += 1;
            await book.save();
        }

        res.json({ message: 'Book returned successfully.', returnDate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

