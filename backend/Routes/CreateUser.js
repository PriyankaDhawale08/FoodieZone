const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to log the request body
router.use((req, res, next) => {
    console.log('Raw Request Body:', req.body);
    next();
});

// Route to handle user registration
router.post("/createUser",
    [
        body('email').isEmail().withMessage('Invalid email address'),
        body('name').isLength({ min: 5 }).withMessage('Name must be at least 5 characters long'),
        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);

        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            });
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, errors: "Server Error" });
        }
    }
);

// Route to handle user login
router.post("/loginUser",
    [
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
            }

            const passwordMatch = await bcrypt.compare(password, userData.password);
            if (!passwordMatch) {
                return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
            }

            const data = {
                user: {
                    id: userData.id
                }
            };

            const authToken = jwt.sign(data, process.env.JWT_SECRET || "your_jwt_secret");
            return res.json({ success: true, authToken: authToken });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, errors: "Server Error" });
        }
    }
);

module.exports = router;
