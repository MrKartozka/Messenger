// import "./App.css";
import "./Form.css"
import { Link, Route, Routes } from "react-router-dom";
// import Register from "./Register";
import App from "../App"
import FormAuth from '../components/FormAuth';

function FormReg() {
    return (
        <div className="App">
            <div className="container">
                <div className="authmenu">
                    <div className="auth-menu__box">
                        <h1>Регистрация</h1>
                        <div className="password-container">
                            <input
                                className="passwordbox"
                                type="nickname"
                                placeholder="Имя пользователя..."
                                maxLength={16}
                            />
                        </div>
                        <input
                            className="emailbox"
                            type="email"
                            placeholder="Почта..."
                            maxLength={30}
                        />
                        <div className="password-container">
                            <input
                                className="passwordbox"
                                type="password"
                                placeholder="Пароль..."
                                maxLength={16}
                            />
                        </div>
                        <div className="password-container">
                            <input
                                className="passwordbox"
                                type="password"
                                placeholder="Подтвердите пароль..."
                                maxLength={16}
                            />
                        </div>
                        <Link to="/App">
                            <button className="buttonbox"> Войти</button>
                        </Link>
                    </div>
                    <div className="registerlink">
                        <p>
                            Есть аккаунт?
                            <Link to="/FormAuth"> Войти</Link>
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
            <Route path="/App" element={<App />} />
            <Route path="/FormAuth" element={<FormAuth />} />
            {/* <Route path="/Register" element={<Register />} /> */}
        </Routes>
    );
}

export default AppRouter;
