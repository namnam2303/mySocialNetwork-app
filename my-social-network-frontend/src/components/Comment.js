import React from "react";
import "../styles/Comment.css";
const Comment = ({ comment }) => {
  return (
    <div className="media m-b-20">
      <a className="media-left" href="#">
        <img
          className="media-object img-radius m-r-20"
          src={comment.user.avatar.substring(7)}
          alt="User avatar"
        />
      </a>
      <div className="media-body b-b-muted social-client-description">
        <div className="chat-header">
          {comment.user.fullName}
          <span className="text-muted">
            {" "}
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>
        <p className="text-muted">{comment.content}</p>
      </div>
    </div>
  );
};

export default Comment;
