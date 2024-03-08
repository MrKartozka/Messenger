import "./App.css";
import "./Messages.css";
import {useState} from 'react';
import { Link } from "react-router-dom";

function Messages() {
    const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [status, setStatus] = useState("online");

    const handleOptionsClick = () => {
        setIsOptionsModalOpen(!isOptionsModalOpen);
    };

    const handleAvatarClick = () => {
        setIsStatusModalOpen(!isStatusModalOpen);
    };
    
    const changeStatus = (newStatus) => {
        setStatus(newStatus);
        setIsStatusModalOpen(false);
    };
    return (
        <div className="mainmenu">
            <div className="container">
                <div className="messenger-sidebar">
                    <div className="messenger-sidebar__title">
                        <h1>Messenger</h1>
                    </div>
                    <div className="messenger-sidebar__profile">
                        <img
                            src="/av4.png"
                            alt=""
                            className={`profile-avatar ${status}`}
                            onClick={handleAvatarClick}
                        />
                        {/* Модальное окно для изменения аватарки и статуса*/}
                        {isStatusModalOpen && (
                            <div className="sidebar-modal__changestatus">
                                <button onClick={() => changeStatus("online")}>
                                    В сети
                                </button>
                                <button onClick={() => changeStatus("away")}>
                                    Нет на месте
                                </button>
                                <button onClick={() => changeStatus("offline")}>
                                    Не беспокоить
                                </button>
                            </div>
                        )}
                        <h3 className="side-profile__nickname">Пользователь</h3>
                        <div className="options-button-wrapper">
                        <button className="side-profile__options" onClick={handleOptionsClick}>...</button>
                        {isOptionsModalOpen && (
                            <div className="sidebar-modal__options">
                                <button>
                                    Сменить аватарку
                                </button>
                                <Link to="/auth">
                                <button>
                                    Сменить пользователя
                                </button>
                                </Link>
                            </div>
                        )}
                        </div>
                    </div>
                    <div className="messenger-sidebar__searchline">
                        <input type="text" name="" id="" placeholder="Поиск" />
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="messenger-sidebar__contacts">
                        <div className="sidebar-contacts__item">
                            <img src="/av2.png" alt="" className="item-avatar" />
                            <div className="contacts-item__info">
                                <div className="contacts-item__name">
                                    <h3>MrPropper</h3>
                                </div>
                                <div className="contacts-item__text">
                                    Привет, друг
                                </div>
                            </div>
                        </div>
                        <div className="sidebar-contacts__item">
                            <img src="/av6.png" alt="" className="item-avatar" />
                            <div className="contacts-item__info">
                                <div className="contacts-item__name">
                                    <h3>MrFreeman</h3>
                                </div>
                                <div className="contacts-item__text">
                                    Пока, друг
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Messages;
