import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  acceptFriendRequest,
  unfriend,
  rejectFriendRequest,
} from "../../actions/friendAction";

import "../../styles/Friend/friend.css";

const FriendRequests = ({ requests }) => {
  const dispatch = useDispatch();

  return (
    <div className="friend-requests">
      <h3 className="section-title">Friend Requests</h3>
      {requests == undefined || requests.length === 0 ? (
        <p className="no-requests">No pending friend requests.</p>
      ) : (
        <ul className="request-list">
          {requests.map((request) => (
            <li key={request.publicId} className="request-item">
              <div className="user-info">
                <img
                  src={request.avatar}
                  alt={request.fullName}
                  className="user-profile-image"
                />
                <div className="user-details">
                  <p className="user-name">{request.fullName}</p>
                  <p className="user-username">{request.username}</p>
                </div>
              </div>
              <div className="action-buttons">
                <button
                  className="btn btn-confirm"
                  onClick={() =>
                    dispatch(acceptFriendRequest(request.publicId))
                  }
                >
                  Confirm
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() =>
                    dispatch(rejectFriendRequest(request.publicId))
                  }
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const CurrentFriends = ({ friends }) => {
  const dispatch = useDispatch();
  const [showUnfriend, setShowUnfriend] = useState(null);

  return (
    <div className="current-friends">
      <h3 className="section-title">Friends</h3>
      {friends.length === 0 ? (
        <p className="no-friends">You don't have any friends yet.</p>
      ) : (
        <ul className="friend-grid">
          {friends.map((friend) => (
            <li key={friend.publicId} className="friend-item">
              <div className="friend-content">
                <img
                  src={`/user/avatar/${friend.username}`}
                  alt={friend.fullName}
                  className="friend-avatar"
                />
                <p className="friend-name">{friend.fullName}</p>
              </div>
              <div className="friend-options">
                <button
                  className="btn btn-options"
                  onClick={() =>
                    setShowUnfriend(
                      showUnfriend === friend.publicId ? null : friend.publicId
                    )
                  }
                >
                  ...
                </button>
                {showUnfriend === friend.publicId && (
                  <div className="unfriend-popup">
                    <button
                      className="btn btn-unfriend"
                      onClick={() => dispatch(unfriend(friend.publicId))}
                    >
                      Unfriend
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const FriendList = () => {
  const { friendRequests, friendList } = useSelector((state) => state.friend);
  const friends = Array.from(new Set(friendList.map((f) => f.username))).map(
    (username) => friendList.find((f) => f.username === username)
  );
  return (
    <div className="friend-list-container">
      <FriendRequests requests={friendRequests} />
      <CurrentFriends friends={friends} />
    </div>
  );
};

export default FriendList;
