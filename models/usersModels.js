const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Role can be 'user' or 'admin'
        default: 'user', // Default role is 'user'
    },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
