const { Book } = require('../models/bookModels');

exports.getBooksByAuthor = async (req, res) => {
    try {
        const authorName = req.params.authorName;
        const recommendations = await Book.find({ author: authorName, quantity: { $gt: 0 } })
                                          .limit(5) // Limit the recommendations to 5 books
                                          .select('title author');

        res.json({ recommendations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



/**
 * @swagger
 * /recommendations/author/{authorName}:
 *   get:
 *     summary: Get book recommendations by author
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: authorName
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the author for whom recommendations are requested.
 *     responses:
 *       200:
 *         description: Recommendations successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recommendations:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/BookRecommendation'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BookRecommendation:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the recommended book.
 *         author:
 *           type: string
 *           description: The author of the recommended book.
 */
