import React, { useState } from "react";
import "./Form.css";
import { Link, useNavigate } from "react-router-dom";

function FormAuth() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: loginData.email,
                    password: loginData.password
                })
            });

            const data = await response.json();

            if (response.status === 200) {
                // Авторизация прошла успешно
                // Сохранение токена в localStorage или в состоянии приложения
                localStorage.setItem('token', data.token);
                navigate('/app'); // Перенаправление пользователя на защищенную страницу
            } else {
                // Обработка ошибок, например, показ сообщения
                alert("Ошибка при входе: " + data);
            }
        } catch (error) {
            console.error('Ошибка при входе', error);
        }
    };

    return (
        <div className="App">
            <div className="container">
                <div className="authmenu">
                    <form onSumbit={handleSubmit}>
                    <div className="auth-menu__box">
                        <h1>Авторизация</h1>
                        <input
                            className="emailbox"
                            name="email"
                            type="email"
                            placeholder="Почта..."
                            maxLength={30}
                            value={loginData.email}
                            onChange={handleChange}
                        />
                        <div className="password-container">
                            <input
                                className="inputbox"
                                name="password"
                                type="password"
                                placeholder="Пароль..."
                                maxLength={16}
                                value={loginData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <Link to="/App">
                            <button className="buttonbox"> Войти</button>
                        </Link>
                    </div>
                    </form>
                    <div className="registerlink">
                        <p>
                            Нет аккаунта?
                            <Link to="/"> Зарегистрируйтесь</Link>
                        </p>
                        <button className="googlelink">Зарегистрироваться с помощью </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormAuth;
