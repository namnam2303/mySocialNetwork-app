import React from "react";
import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const user = useSelector((state) => state.user.userInfo);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/home" className="header__logo">
          f
        </Link>
        <nav className="header__nav">
          <Link
            to="/home"
            className={`header__nav-item ${
              isActive("/home") ? "header__nav-item--active" : ""
            }`}
          >
            <FaHome className="header__nav-icon" />
          </Link>
          <Link
            to="/profile"
            className={`header__nav-item ${
              isActive("/profile") ? "header__nav-item--active" : ""
            }`}
          >
            <FaUser className="header__nav-icon" />
          </Link>
          <Link
            to="/friends"
            className={`header__nav-item ${
              isActive("/friends") ? "header__nav-item--active" : ""
            }`}
          >
            <FaUserFriends className="header__nav-icon" />
          </Link>
          <Link
            to="/notifications"
            className={`header__nav-item ${
              isActive("/notifications") ? "header__nav-item--active" : ""
            }`}
          >
            <FaBell className="header__nav-icon" />
          </Link>
          <Link
            to="/messages"
            className={`header__nav-item ${
              isActive("/messages") ? "header__nav-item--active" : ""
            }`}
          >
            <FaFacebookMessenger className="header__nav-icon" />
          </Link>
        </nav>
        <div className="header__profile">
          <Link to="/profile">
            <img
              src={
                user.avatar
                  ? user.avatar.substring(7)
                  : "https://via.placeholder.com/40"
              }
              alt="Profile"
              className="header__profile-img"
            />
          </Link>

          <button onClick={handleLogout} className="header__logout">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
