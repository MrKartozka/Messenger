const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const userDetails = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
        res.json(userDetails.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.get('/messages/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const messages = await pool.query(
            "SELECT * FROM messages WHERE (receiver_id = $1 OR sender_id = $1) ORDER BY created_at ASC",
            [userId]
        );
        res.json(messages.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.post('/messages/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { text, senderId } = req.body;

        const newMessage = await pool.query(
            "INSERT INTO messages (sender_id, receiver_id, text, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
            [senderId, userId, text]
        );

        res.json(newMessage.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});


module.exports = router;
