import React, { useState } from "react";
import "./Form.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../actions/authActions";

function FormAuth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!loginData.email || !loginData.password) {
            alert("Please fill in both email and password.");
            return;
        }

        dispatch(loginUser(loginData, navigate));
    };

    return (
        <div className="App">
            <div className="container">
                <div className="authmenu">
                    <form onSubmit={handleSubmit}>
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
                            <button type="submit" className="buttonbox">
                                Войти
                            </button>
                        </div>
                    </form>
                    <div className="registerlink">
                        <p>
                            Нет аккаунта?
                            <Link to="/"> Зарегистрируйтесь</Link>
                        </p>
                        <button className="googlelink">
                            Зарегистрироваться с помощью{" "}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormAuth;
