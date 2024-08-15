import React from "react";
import "../styles/FriendList.css";

const FriendsList = ({ friends }) => {
  return (
    <div className="friends-list">
      <h3>Friends</h3>
      <ul>
        {friends.map((friend) => (
          <li
            key={friend.username}
            className={`friend-item ${friend.isOnline ? "online" : "offline"}`}
          >
            <div className="avatar-container">
              <img
                src={"/user/avatar/" + friend.avatar || "/default-avatar.png"}
                alt={friend.fullName}
                className="friend-avatar"
              />
              {friend.isOnline && <span className="online-indicator"></span>}
            </div>
            <span className="friend-name">{friend.fullName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
