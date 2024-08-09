import React, { useState, useEffect } from "react";
import "../../styles/Post.css";
import Comment from "../Comment";
import createComment from "../../actions/commentAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Post = ({ post, comment, username, createComment }) => {
  const [showForm, setShowForm] = useState(false);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (comment && comment.postPublicId === post.publicId) {
      post.comments.push(comment);
    }
  }, [comment]);

  function timeAgo(dateString) {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInMs = now - postDate;

    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);

    if (diffInMinutes < 60) {
      return diffInMinutes < 1
        ? `${diffInSeconds} second${diffInSeconds !== 1 ? "s" : ""} ago`
        : `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
    } else {
      return postDate.toLocaleDateString(); // Hiển thị ngày tháng năm nếu trước lâu hơn 1 tuần
    }
  }

  const handleCommentClick = () => {
    setShowForm(!showForm);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment) {
      return;
    }
    let commentObject = {
      content: newComment,
      isDeleted: false,
    };
    createComment(post.publicId, username, commentObject);
    post.comments.push(comment);
    // Reset form sau khi gửi
    setNewComment("");
  };

  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  return (
    <div className="post-card card">
      <div className="card-block post-timelines">
        <span
          className="dropdown-toggle addon-btn text-muted f-right service-btn"
          data-toggle="dropdown"
        ></span>
        <div className="chat-header f-w-600">{post.user.fullName}</div>
        <div className="social-time text-muted">{timeAgo(post.createdAt)}</div>
      </div>
      {post.imageUrl && (
        <div className="post-image-wrapper">
          <img
            src={post.imageUrl.substring(7)}
            className="img-fluid"
            style={{
              width: "100%",
              maxHeight: "25rem",
              objectFit: "contain",
              margin: "0",
              padding: "0",
              display: "block",
            }}
            alt="Post"
          />
        </div>
      )}

      <div className="card-block">
        <div className="timeline-details">
          <p className="text-muted">{post.content}</p>
        </div>
      </div>
      <div className="card-block b-b-theme b-t-theme social-msg">
        <div className="like-container">
          <div className="like-options">
            <i className="fa fa-thumbs-up" title="Like"></i>
            <i className="fa fa-heart" title="Love"></i>
            <i className="fa fa-laugh" title="Haha"></i>
            <i className="fa fa-sad-tear" title="Sad"></i>
            <i className="fa fa-angry" title="Angry"></i>
          </div>
          <a href="#">
            <i className="fa fa-thumbs-up like-main"></i>(
            {post.reactions.length})
          </a>
        </div>
        <button
          type="button"
          className="comment-button"
          onClick={handleCommentClick}
        >
          <i className="icofont icofont-comment text-muted"></i>
          <span className="b-r-muted">Comments ({post.comments.length})</span>
        </button>
      </div>
      <div className="comment-list">
        {post.comments.map((comment, index) => (
          <Comment
            key={comment.id ? comment.id : `${index}-${comment.postPublicId}`}
            comment={comment}
          />
        ))}
      </div>
      {showForm && (
        <div className="comment-form">
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={handleInputChange}
              placeholder="Write a comment..."
              rows="3"
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

Post.propTypes = {
  createComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapDispatchToProps = {
  createComment,
};
const mapStateToProps = (state) => ({
  comment: state.comment.comment,
  username: state.auth.user.sub,
});
export default connect(mapStateToProps, mapDispatchToProps)(Post);
