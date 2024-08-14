import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/authAction";
import {
  FaHome,
  FaUser,
  FaUserFriends,
  FaBell,
  FaFacebookMessenger,
} from "react-icons/fa";
import "../../styles/Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user.userInfo);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo" onClick={() => handleNavigation("/home")}>
          f
        </div>
        <nav className="header__nav">
          <div
            onClick={() => handleNavigation("/home")}
            className={`header__nav-item ${
              isActive("/home") ? "header__nav-item--active" : ""
            }`}
          >
            <FaHome className="header__nav-icon" />
          </div>
          <div
            onClick={() => handleNavigation(`/profile/${user.username}`)}
            className={`header__nav-item ${
              isActive("/profile") ? "header__nav-item--active" : ""
            }`}
          >
            <FaUser className="header__nav-icon" />
          </div>
          <div
            onClick={() => handleNavigation("/friends")}
            className={`header__nav-item ${
              isActive("/friends") ? "header__nav-item--active" : ""
            }`}
          >
            <FaUserFriends className="header__nav-icon" />
          </div>
          <div
            onClick={() => handleNavigation("/notifications")}
            className={`header__nav-item ${
              isActive("/notifications") ? "header__nav-item--active" : ""
            }`}
          >
            <FaBell className="header__nav-icon" />
          </div>
          <div
            onClick={() => handleNavigation("/messages")}
            className={`header__nav-item ${
              isActive("/messages") ? "header__nav-item--active" : ""
            }`}
          >
            <FaFacebookMessenger className="header__nav-icon" />
          </div>
        </nav>
        <div className="header__profile">
          <div onClick={() => handleNavigation(`/profile/${user.username}`)}>
            <img
              src={
                user.username
                  ? "/user/avatar/" + user.username
                  : "https://via.placeholder.com/40"
              }
              alt="Profile"
              className="user-avatar"
            />
          </div>

          <button onClick={handleLogout} className="header__logout">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
