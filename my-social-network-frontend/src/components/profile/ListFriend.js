import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Profile/ListFriend.css";
import { getAvatarSrc } from "../../utils/utils";

const ListFriend = ({ friends }) => {
  const navigate = useNavigate();

  const handleFriendClick = (username) => {
    navigate(`/profile/${username}`);
  };

  return (
    <div className="friends-list-container">
      <h2>Friends</h2>
      <p className="friend-span">
        {friends.length || 0} friend{friends.length !== 1 ? "s" : ""}
      </p>
      <div className="friends-grid">
        {friends.map((friend) => (
          <div key={friend.username} className="friend-item">
            <div
              onClick={() => handleFriendClick(friend.username)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={getAvatarSrc(friend.username, friend.avatar)}
                alt={friend.fullName}
                className="friend-avatar"
              />
            </div>
            <span className="friend-name">{friend.fullName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListFriend;
