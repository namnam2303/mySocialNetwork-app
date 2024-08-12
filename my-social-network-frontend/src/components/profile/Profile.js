import React from "react";
import Intro from "./Intro";
import "../../styles/Profile/Profile.css";
import ProfileTimeline from "./ProfileTimeline";
import { useSelector } from "react-redux";
import defaultAvatar from "../../assets/images/default.png";

const getAvatarSrc = (username, avatar) => {
  if (!username || avatar == undefined) {
    return defaultAvatar;
  }
  return "/user/avatar/" + username;
};

const Profile = () => {
  const user = useSelector((state) => state.user.userInfo);

  return (
    <div className="profile">
      <div className="profile-header">
        <div
          className="cover-photo"
          style={{ backgroundImage: `url(${user.coverPhoto})` }}
        >
          <img
            src={getAvatarSrc(user.username, user.avatar)}
            alt={user.name}
            className="avatar"
          />
        </div>
        <div className="profile-info">
          <h1>{user.name}</h1>
          <p>{user.friendCount} friends</p>
          <div className="profile-actions">
            <button className="btn btn-primary">Add Friend</button>
            <button className="btn btn-secondary">Message</button>
          </div>
        </div>
      </div>
      <div className="profile-content">
        <div className="intro-section"></div>
        <div className="timeline-section">
          <ProfileTimeline />
        </div>
      </div>
    </div>
  );
};

export default Profile;
