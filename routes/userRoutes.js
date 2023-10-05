const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.post('/register', userController.registerUser);
userRouter.post('/login', userController.loginUser);

module.exports = {userRouter};
