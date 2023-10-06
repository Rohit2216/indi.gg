const { BorrowedBook } = require('../models/borrowModel');
const { Book } = require('../models/bookModels');

const borrowBook = async (req, res) => {
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

        const borrowedBook = new BorrowedBook({
            userId,
            bookId,
            expectedReturnDate: returnDate, // Store expected return date
        });
        await borrowedBook.save();

        // Update book quantity
        book.quantity -= 1;
        await book.save();

        res.status(201).json({ message: 'Book borrowed successfully.', expectedReturnDate: returnDate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const returnBook = async (req, res) => {
    try {
        const { borrowedBookId, returnDate } = req.body;

        // Find the borrowed book record
        const borrowedBook = await BorrowedBook.findById(borrowedBookId);
        if (!borrowedBook) {
            return res.status(404).json({ error: 'Borrowed book record not found.' });
        }

        // Update the actual return date if provided
        if (returnDate) {
            borrowedBook.returnDate = returnDate;
        } else {
            borrowedBook.returnDate = new Date(); // Set the return date to the current date if not provided
        }

        await borrowedBook.save();

        // Update book quantity (assuming you have the bookId stored in the borrowedBook record)
        const book = await Book.findById(borrowedBook.bookId);
        if (book) {
            book.quantity += 1;
            await book.save();
        }

        res.json({ message: 'Book returned successfully.', returnDate: borrowedBook.returnDate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *       description: Bearer token authorization header
*/



/**
 * @swagger
 * /borrow/borrowbooks:
 *   post:
 *     summary: Borrow a book
 *     tags:
 *       - Borrowing
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: User ID and Book ID
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user borrowing the book
 *               bookId:
 *                 type: string
 *                 description: ID of the book being borrowed
 *             example:
 *               userId: "exampleUserId"
 *               bookId: "exampleBookId"
 *     responses:
 *       201:
 *         description: Book borrowed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 expectedReturnDate:
 *                   type: string
 *                   format: date-time
 *                   description: Expected return date of the book
 *       400:
 *         description: Bad request, invalid input provided
 *       404:
 *         description: Book not available for borrowing or user has already borrowed 3 books
 */

/**
 * @swagger
 * /borrow/returnbooks:
 *   post:
 *     summary: Return a borrowed book
 *     tags:
 *       - Returning
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Borrowed book ID and return date
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               borrowedBookId:
 *                 type: string
 *                 description: ID of the borrowed book record
 *               returnDate:
 *                 type: string
 *                 format: date-time
 *                 description: Actual return date of the book (optional, default is the current date)
 *             example:
 *               borrowedBookId: "exampleBorrowedBookId"
 *               returnDate: "2023-10-20"
 *     responses:
 *       200:
 *         description: Book returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 returnDate:
 *                   type: string
 *                   format: date-time
 *                   description: Actual return date of the book
 *       400:
 *         description: Bad request, invalid input provided
 *       404:
 *         description: Borrowed book record not found
 */

// Your controller functions go here



module.exports = {
    borrowBook,
    returnBook
};
