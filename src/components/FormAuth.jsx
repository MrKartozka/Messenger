// import "./App.css";
import "./Form.css"
import { Link, Route, Routes } from "react-router-dom";
// import Mainmenu from "./Mainmenu";
// import Register from "./Register";
import FormReg from "../components/FormReg"
import App from "../App"

function FormAuth() {
    return (
        <div className="App">
            <div className="container">
                <div className="authmenu">
                    <div className="auth-menu__box">
                        <h1>Авторизация</h1>
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
                        <Link to="/Mainmenu">
                            <button className="buttonbox"> Войти</button>
                        </Link>
                    </div>
                    <div className="registerlink">
                        <p>
                            Нет аккаунта?
                            <Link to="/Register"> Зарегистрируйтесь</Link>
                        </p>
                        <button className="googlelink">Зарегистрироваться с помощью </button>
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
