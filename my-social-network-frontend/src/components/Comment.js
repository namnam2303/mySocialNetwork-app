import React from "react";
import "../styles/Comment.css";
import { Link } from "react-router-dom";
const Comment = ({ comment }) => {
  return (
    <div className="media m-b-20">
      <Link to={`/profile/${comment.user.username}`} className="media-left">
        <img
          className="media-object img-radius m-r-20"
          src={comment.user.avatar.substring(7)}
          alt="User avatar"
        />
      </Link>
      <div className="media-body b-b-muted social-client-description">
        <div className="chat-header">
          {comment.user.fullName}
          <span className="text-muted">
            {" "}
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>
        <p className="text-coment">{comment.content}</p>
      </div>
    </div>
  );
};

export default Comment;
