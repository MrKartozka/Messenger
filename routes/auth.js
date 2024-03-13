const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const usernameExists = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (usernameExists.rows.length > 0) {
            return res.status(409).json("Username is already taken.");
        }

        const emailExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (emailExists.rows.length > 0) {
            return res.status(409).json("Email is already taken.");
        }

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *", [username, email, bcryptPassword]);
        console.log(newUser.rows[0]);
        const token = jwt.sign({ user_id: newUser.rows[0].id }, process.env.JWT_SECRET);

        res.status(201).cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000
        }).json({ message: "User registered successfully.", token, username: newUser.rows[0].username }); // Include username

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length > 0) {
            const validPassword = await bcrypt.compare(password, user.rows[0].password);
            if (validPassword) {
                const token = jwt.sign({ user_id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

                res.cookie('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 3600000
                }).json({ message: "Logged in successfully.", token, username: user.rows[0].username });
            } else {
                res.status(401).json({ message: "Password is incorrect." });
            }
        } else {
            res.status(401).json({ message: "User does not exist." });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token').json({ message: "Logged out successfully." });
});

module.exports = router;
