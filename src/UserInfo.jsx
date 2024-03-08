import "./UserInfo.css";

function UserInfo() {
    return (
        <div className="userinfo-container">
                <img className="userinfo-avatar" src="/av6.png" alt="" />
            <div className="userinfo-textinfo">
                <h3 className="textinfo-username">Пользователь</h3>
                <p className="textinfo-online">Online</p>
            </div>
        </div>
    );
}

export default UserInfo;
