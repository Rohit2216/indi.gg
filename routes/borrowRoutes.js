const express = require('express');
const borrowRouter = express.Router();
const borrowedBookController = require('../controllers/borrowedBookController');

borrowRouter.post('/borrowbooks', borrowedBookController.borrowBook);
borrowRouter.post('/returnbooks', borrowedBookController.returnBook);

module.exports = {borrowRouter};
