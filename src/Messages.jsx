import "./App.css";
import "./Messages.css"
import { Link, Route, Routes } from "react-router-dom";
import { useState } from "react";

function Messages() {
    return (
        <div className="mainmenu">
            <div className="container">
                <div className="messenger-sidebar">
                    <div className="messenger-sidebar__title">
                        <h1>Messenger</h1>
                    </div>
                    <div className="messenger-sidebar__profile">
                        <img src="" alt="" className="profile-avatar" />
                        <h3 className="side-profile__nickname">Пользователь</h3>
                    </div>
                    <div className="messenger-sidebar__searchline">
                        <input type="text" name="" id="" placeholder="Поиск" />
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="messenger-sidebar__contacts">
                        <div className="sidebar-contacts__item">
                            <img src="#" alt="" className="item-avatar" />
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
                            <img src="#" alt="" className="item-avatar" />
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
