const express = require('express');
const borrowRouter = express.Router();
const borrowedBookController = require('../controllers/borrowedBookController');
const {Authentication}=require("../middlewares/authentication")

borrowRouter.post('/borrowbooks',Authentication(["admin","user"]), borrowedBookController.borrowBook);
borrowRouter.post('/returnbooks',Authentication(["admin","user"]), borrowedBookController.returnBook);
borrowRouter.get('/user/:userId',Authentication(["admin","user"]), borrowedBookController.getBorrowedBooksByUserId);

module.exports = {borrowRouter};
