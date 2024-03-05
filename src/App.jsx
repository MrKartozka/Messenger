import "./App.css";
import Chat from "./Chat";
import UserInfo from "./UserInfo";
import Messages from "./Messages";

function MainScreen() {
    return (
        <div className="mainmenu">
            <div className="container">
                <div className="messenger-window">
                    <Messages />
                    <Chat />
                    <UserInfo />
                </div>
            </div>
        </div>
    );
}

export default MainScreen;
