const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Регистрация
router.post('/register', async (req, res) => {
    try {
        // 1. Получение данных пользователя из тела запроса (req.body)
        const { username, email, password } = req.body;

        // 2. Проверка, существует ли пользователь с таким username
        const usernameExists = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );

        if (usernameExists.rows.length > 0) {
            return res.status(409).json("Пользователь с таким никнеймом уже существует");
        }

        // 3. Проверка, существует ли пользователь с таким email
        const emailExists = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (emailExists.rows.length > 0) {
            return res.status(409).json("Пользователь с таким email уже существует");
        }

        // 4. Хэширование пароля пользователя
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // 5. Вставка нового пользователя в базу данных
        const newUser = await pool.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
            [username, email, bcryptPassword]
        );

        // 6. Генерация токена JWT
        const token = jwt.sign({ user_id: newUser.rows[0].id }, process.env.JWT_SECRET);

        // 7. Отправка токена клиенту
        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Вход
router.post('/login', async (req, res) => {
    try {
        // 1. Получение данных пользователя из тела запроса
        const { email, password } = req.body;

        // 2. Проверка, существует ли пользователь с таким email
        const user = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        // Если пользователя нет, отправить соответствующий ответ
        if (user.rows.length === 0) {
            return res.status(401).json("Почта или пароль неверны");
        }

        // 3. Проверка введенного пароля с хэшированным паролем в базе данных
        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        // Если пароль неверный, отправить соответствующий ответ
        if (!validPassword) {
            return res.status(401).json("Почта или пароль неверны");
        }

        // 4. Если пароль верный, генерировать JWT токен
        const token = jwt.sign({ user_id: user.rows[0].id }, process.env.JWT_SECRET);

        // 5. Отправка токена клиенту
        res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
