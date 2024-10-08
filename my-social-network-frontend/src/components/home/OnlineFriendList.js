import React from "react";
import "../../styles/FriendList.css";

const FriendsList = ({ friends }) => {
  // Kiểm tra xem friends có phải là một mảng và có phần tử không
  const hasFriends = Array.isArray(friends) && friends.length > 0;
  let friendList;
  if (hasFriends) {
    friendList = Array.from(new Set(friends.map((f) => f.username))).map(
      (username) => friends.find((f) => f.username === username)
    );
  }

  return (
    <div className="friends-list">
      <h3>Friends</h3>
      {hasFriends ? (
        <ul>
          {friendList.map((friend) => (
            <li
              key={friend.username}
              className={`friend-item ${friend.online ? "online" : "offline"}`}
            >
              <div className="avatar-container">
                <img
                  src={`/user/avatar/${friend.username}`}
                  alt={friend.fullName}
                  className="user-avatar"
                />
                {friend.online && <span className="online-indicator"></span>}
              </div>
              <span className="friend-name">{friend.fullName}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-friends-message">Bạn chưa có bạn bè nào.</p>
      )}
    </div>
  );
};

export default FriendsList;
