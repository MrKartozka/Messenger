import "./Form.css";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import App from "../App";
import FormAuth from "../components/FormAuth";
import { useState } from "react";
import { registerUser } from '../actions/authActions';
import { useDispatch } from 'react-redux';

function FormReg() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        
        dispatch(registerUser({
            username: formData.username,
            email: formData.email,
            password: formData.password
        }, navigate));
    };

    return (
        <div className="App">
            <div className="container">
                <div className="authmenu">
                    <form onSubmit={handleSubmit}>
                        <div className="auth-menu__box">
                            <h1>Регистрация</h1>
                            <div className="password-container">
                                <input
                                    className="inputbox"
                                    name="username"
                                    type="nickname"
                                    placeholder="Имя пользователя..."
                                    maxLength={16}
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <input
                                className="emailbox"
                                name="email"
                                type="email"
                                placeholder="Почта..."
                                maxLength={30}
                                value={formData.email}
                                    onChange={handleChange}
                            />
                            <div className="password-container">
                                <input
                                    className="inputbox"
                                    name="password"
                                    type="password"
                                    placeholder="Пароль..."
                                    maxLength={16}
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="password-container">
                                <input
                                    className="confirm-password"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Подтвердите пароль..."
                                    maxLength={16}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit" className="buttonbox">Зарегистрироваться</button>
                        </div>
                    </form>
                    <div className="registerlink">
                        <p>
                            Есть аккаунт?
                            <Link to="/auth"> Войти</Link>
                        </p>
                        <button className="googlelink">Войти с помощью </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<FormReg />} />
            <Route path="/app" element={<App />} />
            <Route path="/auth" element={<FormAuth />} />
        </Routes>
    );
}

export default AppRouter;
