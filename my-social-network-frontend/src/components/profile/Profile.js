import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Intro from "./Intro";
import ProfileTimeline from "./ProfileTimeline";
import ListFriend from "./ListFriend";
import "../../styles/Profile/Profile.css";
import { getAvatarSrc } from "../../utils/utils";
import setAuthToken from "../../utils/setAuthToken";
import axios from "axios";
import { getListFriend } from "../../actions/friendAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Profile = ({ getListFriend }) => {
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = useSelector((state) => state.user.userInfo);
  const isCurrentUser = currentUser.username === username;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const friendList = useSelector((state) => state.friend);

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log(`Fetching user data for ${username}`);
      if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
      }
      const response = await axios.get(`/api/user/${username}`);
      setProfileUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("User not found");
    } finally {
      setLoading(false);
    }
  }, [username, dispatch]);

  useEffect(() => {
    fetchUserData();
    getListFriend(username);
  }, [username, fetchUserData, getListFriend]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
            alt={profileUser.fullName}
            className="avatar"
          />
        </div>
        <div className="profile-info">
          <h1>{profileUser.fullName}</h1>
          {!isCurrentUser && (
            <div className="profile-actions">
              <button className="btn btn-primary">Add Friend</button>
              <button className="btn btn-secondary">Message</button>
            </div>
          )}
        </div>
      </div>
      <div className="profile-content">
        <div className="left-column">
          <Intro user={profileUser} />
          <ListFriend friends={friendList} />
        </div>
        <div className="right-column">
          <ProfileTimeline user={profileUser} />
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  getListFriend: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  getListFriend,
};

export default connect(null, mapDispatchToProps)(Profile);
