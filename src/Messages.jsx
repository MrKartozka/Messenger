import "./App.css";
import "./Messages.css";
import { useState } from 'react';
import { Link } from "react-router-dom";

function Messages() {
    const profileAvatars = ['av1.png', 'av2.png', 'av3.png', 'av4.png', 'av5.png', 'av6.png',]
    const [currentAvatar, setCurrentAvatar] = useState(profileAvatars[4]);
    const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [isChangeAvatarOpen, setIsChangeAvatarOpen] = useState(false);
    const [status, setStatus] = useState("online");

    const showAllAvatars = () => {
        for (let i = 0; i < profileAvatars.length; i++) {

        }
    }
    const handleAvatarChange = (avatar) => {
        setCurrentAvatar(avatar);
        setIsChangeAvatarOpen(false); // Закрытие модального окна после выбора аватара
    }

    const handleOptionsClick = () => {
        setIsOptionsModalOpen(!isOptionsModalOpen);
        setIsChangeAvatarOpen(false)
    };

    const handleAvatarClick = () => {
        setIsStatusModalOpen(!isStatusModalOpen);
    };
    const handleChangeAvatarClick = () => {
        setIsChangeAvatarOpen(!isChangeAvatarOpen)
        setIsOptionsModalOpen(!isOptionsModalOpen);
    }
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
                            src={currentAvatar}
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
                                    <button onClick={handleChangeAvatarClick}>
                                        Сменить аватарку
                                    </button>

                                    <Link to="/auth">
                                        <button>
                                            Сменить пользователя
                                        </button>
                                    </Link>
                                </div>
                            )}
                            {isChangeAvatarOpen && (
                                <div className="sidebar-modal__avatars">
                                    {profileAvatars.map((avatar, index) => (
                                        <button key={index} onClick={() => handleAvatarChange(avatar)}>
                                            <img src={avatar} alt={`avatar ${index}`} />
                                        </button>
                                    ))}
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
        </div >
    );
}

export default Messages;
