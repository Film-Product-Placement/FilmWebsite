const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// register
exports.registerUser = async (req, res) => {
    const { accountType, fullname, email, phone, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            accountType,
            fullname,
            email,
            phone,
            username,
            password,
            isAdmin: false // make sure new user is not admin
        });

        // encrypt pw
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();

        const payload = {
            user: {
                id: newUser.id
            }
        };
        console.log('Generating token with payload:', payload);
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            console.log('Generated token:', token);
            res.status(201).json({ token, message: 'User registered successfully' });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        console.log('Generating token with payload:', payload);
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            console.log('Generated token:', token);
            res.status(200).json({ token, message: 'User logged in successfully' });
        });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// get profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};
