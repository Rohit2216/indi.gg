// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { User } = require('../models/usersModels');
// require("dotenv").config();

// exports.registerUser = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({
//             name,
//             email,
//             password: hashedPassword,
//         });
//         await user.save();
//         res.status(201).json({ message: 'User registered successfully.' });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to register user.' });
//     }
// };

// exports.loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ error: 'Invalid email or password.' });
//         }

//         const isValidPassword = await bcrypt.compare(password, user.password);
//         if (!isValidPassword) {
//             return res.status(401).json({ error: 'Invalid email or password.' });
//         }

//         // Create a JWT token with user ID as the payload
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         // Send the token in the response along with a success message
//         res.status(200).json({ message: 'Login successful.', token });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to authenticate.' });
//     }
// };


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/usersModels');
require("dotenv").config();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:  # Include the role field in the Swagger schema
 *                 type: string
 *                 enum: ['user', 'admin']  # Allow 'user' or 'admin' as role values
 *             example:
 *               name: John Doe
 *               email: johndoe@example.com
 *               password: password123
 *               role: user  # Default role is 'user'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       500:
 *         description: Failed to register user
 */

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'user',  // Set default role to 'user' if not provided
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user.' });
    }
};

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: johndoe@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *             example:
 *               message: Login successful
 *               token: <JWT_TOKEN>
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Failed to authenticate
 */

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Create a JWT token with user ID and role as the payload
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the token in the response along with a success message
        res.status(200).json({ message: 'Login successful.', token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to authenticate.' });
    }
};
