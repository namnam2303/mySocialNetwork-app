import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Intro from "./Intro";
import "../../styles/Profile/Profile.css";
import ProfileTimeline from "./ProfileTimeline";
import { getAvatarSrc } from "../../utils/utils";
import setAuthToken from "../../utils/setAuthToken";
import axios from "axios";
import { getListFriend } from "../../actions/friendAction";
import { connect } from "react-redux";
import Proptyes from "prop-types";
import { useDispatch } from "react-redux";

const Profile = () => {
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.user.userInfo);
  const isCurrentUser = currentUser.username === username;
  const dispatch = useDispatch();
  const friendList = useSelector((state) => state.friend);
  const fetchUserData = useCallback(async () => {
    if (!username || profileUser) return;

    setLoading(true);
    try {
      console.log(`Fetching user data for ${username}`);
      if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
      }
      const response = await axios.get(`/api/user/${username}`);

      setProfileUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }, [username, profileUser]);

  useEffect(() => {
    fetchUserData();
    if (username) {
      dispatch(getListFriend(username));
    }
  }, [username, fetchUserData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profileUser) {
    return <div>User not found</div>;
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <div
          className="cover-photo"
          style={{ backgroundImage: `url(${profileUser.coverPhoto})` }}
        >
          <img
            src={getAvatarSrc(profileUser.username, profileUser.avatar)}
            alt={profileUser.name}
            className="avatar"
          />
        </div>
        <div className="profile-info">
          <h1>{profileUser.name}</h1>
          <p className="friend-span">
            {friendList.length || 0} friend {friendList.length > 1 ? `s` : ``}
          </p>
          {!isCurrentUser && (
            <div className="profile-actions">
              <button className="btn btn-primary">Add Friend</button>
              <button className="btn btn-secondary">Message</button>
            </div>
          )}
        </div>
      </div>
      <div className="profile-content">
        <div className="intro-section">
          <Intro user={profileUser} />
        </div>
        <div className="timeline-section">
          <ProfileTimeline user={profileUser} />
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  getListFriend: Proptyes.func.isRequired,
};

const mapDispatchToProps = {
  getListFriend,
};

export default connect(null, mapDispatchToProps)(Profile);
