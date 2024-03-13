import React, { useState } from "react";
import "./App.css";
import Chat from "./Chat";
import UserInfo from "./UserInfo";
import Messages from "./Messages";

function MainScreen() {
    const [selectedUser, setSelectedUser] = useState(null);
    const loggedInUserId = localStorage.getItem("userId");

    return (
        <div className="mainmenu">
            <div className="container">
                <div className="messenger-window">
                    <Messages onUserSelect={setSelectedUser} />
                    {selectedUser && (
                        <Chat
                            selectedUserId={selectedUser.id}
                            loggedInUserId={loggedInUserId}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default MainScreen;
