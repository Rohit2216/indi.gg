const express = require('express');
const recommendRouter = express.Router();
const recommendationController = require('../controllers/recommendationController');

// Route to get author-based book recommendations
recommendRouter.get('/author/:authorName', recommendationController.getBooksByAuthor);

module.exports = {recommendRouter}; // Export the router directly, not as an object
