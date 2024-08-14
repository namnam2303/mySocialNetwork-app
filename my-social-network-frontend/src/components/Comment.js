import React from "react";
import "../styles/Comment.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Comment = ({ comment }) => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate(`/profile/${comment.user.username}`);
  };
  const username = useSelector((state) => state.auth.user.sub);

  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInSeconds < 60) return `${diffInSeconds}s`;
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInHours < 24) return `${diffInHours}h`;
    if (diffInDays < 30) return `${diffInDays}d`;
    if (diffInMonths < 12) return `${diffInMonths}m`;
    return `${diffInYears}y`;
  };

  return (
    <div className="comment">
      <div className="comment-header">
        <img
          className="comment-avatar"
          src={`/user/avatar/${comment.user.username}`}
          alt="User avatar"
          onClick={handleUserClick}
        />
        <div className="comment-info">
          <span className="comment-author" onClick={handleUserClick}>
            {comment.user.username === username ? "You" : comment.user.fullName}
          </span>
          <p className="comment-content">{comment.content}</p>
        </div>
      </div>
      <div className="comment-footer">
        <span className="comment-time">
          {getRelativeTime(comment.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default Comment;
