const {Book} = require('../models/bookModels');


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
 * tags:
 *   name: Books
 *   description: Book management APIs
 */

/**
 * @swagger
 * /book/addbooks:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ISBN:
 *                 type: string
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedYear:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *             example:
 *               ISBN: "1234567890"
 *               title: "Sample Book"
 *               author: "John Doe"
 *               publishedYear: 2023
 *               quantity: 10
 *     responses:
 *       201:
 *         description: Book added successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal Server Error
 */


exports.addBook = async (req, res) => {
    try {
        const { ISBN, title, author, publishedYear, quantity } = req.body;
        const book = new Book({
            ISBN,
            title,
            author,
            publishedYear,
            quantity,
        });
        await book.save();
        res.status(201).json({ message: 'Book added successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




/**
 * @swagger
 * /book/update/{id}:
 *   patch:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publishedYear:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *             example:
 *               title: "Updated Book Title"
 *               author: "Jane Smith"
 *               publishedYear: 2022
 *               quantity: 15
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal Server Error
 */



exports.updateBook = async (req, res) => {
    try {
        const { title, author, publishedYear, quantity } = req.body;
        const book = await Book.findOne({ id: req.params._id });
        if (!book) {
            return res.status(404).json({ error: 'Book not found.' });
        }
        book.title = title;
        book.author = author;
        book.publishedYear = publishedYear;
        book.quantity = quantity;
        await book.save();
        res.json({ message: 'Book updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



/**
 * @swagger
 * /book/delete/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal Server Error
 */

exports.deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.deleteOne({ id: req.params._id });
        if (deletedBook.deletedCount === 0) {
            return res.status(404).json({ error: 'Book not found.' });
        }
        res.json({ message: 'Book deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

    


/**
 * @swagger
 * /book/getbooks:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ISBN:
 *                     type: string
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   publishedYear:
 *                     type: integer
 *                   quantity:
 *                     type: integer
 *                 example:
 *                   ISBN: "1234567890"
 *                   title: "Sample Book"
 *                   author: "John Doe"
 *                   publishedYear: 2023
 *                   quantity: 10
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal Server Error
 */



exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.searchBooks = async (req, res) => {
    const searchTerm = req.query.search; // Assuming the search term is passed in the query parameter 'q'
    
    try {
        const searchResults = await Book.find({
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive title search
                { author: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive author search
                { ISBN: { $regex: searchTerm, $options: 'i' } } // Case-insensitive ISBN search
            ]
        });

        res.json({ results: searchResults });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/**
 * @swagger
 * /book/search:
 *   get:
 *     summary: Search for books by title, author, or ISBN
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: search
 *         required: true
 *         schema:
 *           type: string
 *         description: The search term for title, author, or ISBN.
 *     responses:
 *       200:
 *         description: Search results successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *       500:
 *         description: Internal Server Error
 *       400:
 *         description: Bad Request - Invalid search term or missing parameter.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the book.
 *         title:
 *           type: string
 *           description: The title of the book.
 *         author:
 *           type: string
 *           description: The author of the book.
 *         ISBN:
 *           type: string
 *           description: The ISBN of the book.
 */
