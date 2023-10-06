const express = require('express');
const bookRouter = express.Router();
const bookController = require('../controllers/bookController');
const {Authentication}=require("../middlewares/authentication")


bookRouter.post('/addbooks',Authentication(["admin"]), bookController.addBook);
bookRouter.patch('/update/:id',Authentication(["admin"]), bookController.updateBook);
bookRouter.delete('/delete/:id',Authentication(["admin"]), bookController.deleteBook);
bookRouter.get('/getbooks', bookController.getAllBooks);
bookRouter.get('/search',bookController.searchBooks)

module.exports = {bookRouter};
