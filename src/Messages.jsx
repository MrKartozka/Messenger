import "./App.css";
import "./Messages.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Messages({ onUserSelect }) {
    const profileAvatars = [
        "av1.png",
        "av2.png",
        "av3.png",
        "av4.png",
        "av5.png",
        "av6.png",
    ];

    const [currentAvatar, setCurrentAvatar] = useState(profileAvatars[4]);
    const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [isChangeAvatarOpen, setIsChangeAvatarOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [status, setStatus] = useState("online");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [username, setUsername] = useState(
        localStorage.getItem("username") || "Пользователь"
    );

    const fetchUsers = async () => {
        try {
            const loggedInUserId = localStorage.getItem("userId");
            const response = await axios.get(
                `http://localhost:5000/api/users`,
                {
                    params: { loggedInUserId },
                }
            );
            setUsers(
                response.data.filter((user) => user.id !== loggedInUserId)
            );
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();

        const updateUsername = () => {
            setUsername(localStorage.getItem("username") || "Пользователь");
        };

        window.addEventListener("storage", updateUsername);

        const handleNewUser = () => {
            fetchUsers();
        };

        window.addEventListener("new-user-registered", handleNewUser);

        return () => {
            window.removeEventListener("storage", updateUsername);
            window.removeEventListener("new-user-registered", handleNewUser);
        };
    }, []);

    useEffect(() => {
        const updateUsername = () => {
            setUsername(localStorage.getItem("username") || "Пользователь");
        };

        updateUsername();

        window.addEventListener("storage", updateUsername);

        return () => {
            window.removeEventListener("storage", updateUsername);
        };
    }, []);

    const handleChangeUser = () => {
        localStorage.removeItem("username");
        setUsername("Пользователь");
        navigate("/auth");
    };

    const handleUserClick = (user) => {
        onUserSelect(user);
    };

    const handleAvatarChange = (avatar) => {
        setCurrentAvatar(avatar);
        setIsChangeAvatarOpen(false);
    };

    const handleOptionsClick = () => {
        setIsOptionsModalOpen(!isOptionsModalOpen);
        setIsChangeAvatarOpen(false);
    };

    const handleAvatarClick = () => {
        setIsStatusModalOpen(!isStatusModalOpen);
    };
    const handleChangeAvatarClick = () => {
        setIsChangeAvatarOpen(!isChangeAvatarOpen);
        setIsOptionsModalOpen(!isOptionsModalOpen);
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
                            src={currentAvatar}
                            alt=""
                            className={`profile-avatar ${status}`}
                            onClick={handleAvatarClick}
                        />
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
                        <h3 className="side-profile__nickname">{username}</h3>
                        <div className="options-button-wrapper">
                            <button
                                className="side-profile__options"
                                onClick={handleOptionsClick}
                            >
                                ...
                            </button>
                            {isOptionsModalOpen && (
                                <div className="sidebar-modal__options">
                                    <button onClick={handleChangeAvatarClick}>
                                        Сменить аватарку
                                    </button>

                                    <Link to="/auth">
                                        <button onClick={handleChangeUser}>
                                            Сменить пользователя
                                        </button>
                                    </Link>
                                </div>
                            )}
                            {isChangeAvatarOpen && (
                                <div className="sidebar-modal__avatars">
                                    {profileAvatars.map((avatar, index) => (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                handleAvatarChange(avatar)
                                            }
                                        >
                                            <img
                                                src={avatar}
                                                alt={`avatar ${index}`}
                                            />
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
                        {users.map((user, index) => (
                            <div
                                className="sidebar-contacts__item"
                                key={user.id}
                                onClick={() => handleUserClick(user)}
                            >
                                <img
                                    src={
                                        profileAvatars[
                                            index % profileAvatars.length
                                        ]
                                    }
                                    alt=""
                                    className="item-avatar"
                                />
                                <div className="contacts-item__info">
                                    <div className="contacts-item__name">
                                        <h3>{user.username}</h3>
                                    </div>
                                    <div className="contacts-item__text">
                                        Last message here...
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Messages;
