import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Profile/ListFriend.css";
import { getAvatarSrc } from "../../utils/utils";

const ListFriend = ({ friends }) => {
  const navigate = useNavigate();

  const handleFriendClick = (username) => {
    navigate(`/profile/${username}`);
  };
  const friendList = Array.from(new Set(friends.map((f) => f.username))).map(
    (username) => friends.find((f) => f.username === username)
  );

  return (
    <div className="friends-list-container">
      <h2>Friends</h2>
      <p className="friend-span">
        {friendList.length || 0} friend{friends.length !== 1 ? "s" : ""}
      </p>
      <div className="friends-grid">
        {friendList.map((friend) => (
          <div key={friend.publicId} className="friend-item">
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
