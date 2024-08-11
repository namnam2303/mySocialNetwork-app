import React, { useState } from "react";
import "../../styles/Post.css";
import Comment from "../Comment";
import createComment from "../../actions/commentAction";
import { deletePost } from "../../actions/postAction";
import { createOrUpdateReaction } from "../../actions/reactionAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Post = ({
  post,
  username,
  createComment,
  deletePost,
  createOrUpdateReaction,
  onPostDeleted,
  onCommentAdded,
  onReactionUpdated,
  user,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [reactions, setReactions] = useState(post.reactions || []);

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
    } else if (diffInWeeks < 4) {
      return `${diffInWeeks} week${diffInWeeks !== 1 ? "s" : ""} ago`;
    } else {
      return postDate.toLocaleDateString();
    }
  }

  const handleCommentClick = () => {
    setShowForm(!showForm);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment) {
      return;
    }
    let commentObject = {
      content: newComment,
      isDeleted: false,
      user: { username: username },
      createdAt: new Date().toISOString(),
    };
    try {
      const createdComment = await createComment(
        post.publicId,
        username,
        commentObject
      );
      const commentWithId = {
        ...createdComment,
        id: createdComment?.id || `temp-${Date.now()}`,
        user: user,
        createdAt: createdComment?.createdAt || new Date().toISOString(),
        content: newComment,
      };
      setComments((prevComments) => [...prevComments, commentWithId]);
      setNewComment("");
      setShowForm(false);
      if (onCommentAdded) {
        onCommentAdded(post.publicId, commentWithId);
      }
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  const toggleComments = () => {
    setShowAllComments(!showAllComments);
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(post.publicId);
      setIsDeleted(true);
      if (onPostDeleted) {
        onPostDeleted(post.publicId);
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleReaction = async (reactionType) => {
    try {
      const reactionObject = {
        reactionType: reactionType,
        createdAt: new Date().toISOString(),
      };
      const updatedReaction = await createOrUpdateReaction(
        post.publicId,
        username,
        reactionObject
      );

      setReactions((prevReactions) => {
        const existingReactionIndex = prevReactions.findIndex(
          (r) => r.publicId === updatedReaction.publicId
        );
        if (existingReactionIndex > -1) {
          // Nếu reaction đã tồn tại, cập nhật nó
          const updatedReactions = [...prevReactions];
          updatedReactions[existingReactionIndex] = updatedReaction;
          return updatedReactions;
        } else {
          // Nếu chưa, thêm reaction mới
          return [...prevReactions, updatedReaction];
        }
      });

      if (onReactionUpdated) {
        onReactionUpdated(post.publicId, updatedReaction);
      }
    } catch (error) {
      console.error("Failed to update reaction:", error);
    }
  };

  const getUserReaction = () => {
    // một reaction cho mỗi user trên mỗi post
    return reactions.length > 0 ? reactions[0].reactionType : null;
  };

  const getReactionIcon = (type) => {
    switch (type) {
      case "LIKE":
        return "thumbs-up";
      case "LOVE":
        return "heart";
      case "HAHA":
        return "laugh";
      case "SAD":
        return "sad-tear";
      case "ANGRY":
        return "angry";
      default:
        return "thumbs-up";
    }
  };

  const displayedComments =
    comments.length > 1 && !showAllComments
      ? [comments[comments.length - 1]]
      : comments;

  if (isDeleted) {
    return null;
  }

  return (
    <div className="post-card">
      <div className="card-block post-timelines">
        <div className="post-header">
          <div className="chat-header">{post.user.fullName}</div>
          <div className="social-time">{timeAgo(post.createdAt)}</div>
        </div>
        {username === post.user.username && (
          <div className="post-options">
            <button className="options-button" onClick={toggleOptions}>
              ...
            </button>
            {showOptions && (
              <div className="options-dropdown">
                <button onClick={handleDeletePost}>Delete</button>
              </div>
            )}
          </div>
        )}
      </div>
      {post.imageUrl && (
        <div className="post-image-wrapper">
          <img
            src={post.imageUrl ? post.imageUrl.substring(7) : ""}
            alt="Post"
          />
        </div>
      )}

      <div className="card-block">
        <div className="timeline-details">
          <p>{post.content}</p>
        </div>
      </div>
      <div className="social-msg">
        <div className="like-container">
          <div className="like-options">
            {["LIKE", "LOVE", "HAHA", "SAD", "ANGRY"].map((type) => (
              <i
                key={type}
                className={`fa fa-${getReactionIcon(type)}`}
                title={type.charAt(0) + type.slice(1).toLowerCase()}
                onClick={() => handleReaction(type)}
              ></i>
            ))}
          </div>
          <button className="like-main">
            <i
              className={`fa fa-${getReactionIcon(
                getUserReaction() || "LIKE"
              )}`}
            ></i>
            {getUserReaction()
              ? getUserReaction().charAt(0) +
                getUserReaction().slice(1).toLowerCase()
              : "Like"}{" "}
            ({reactions.length})
          </button>
        </div>
        <button className="comment-button" onClick={handleCommentClick}>
          <i className="fa fa-comment"></i>
          Comment ({comments.length})
        </button>
      </div>
      {comments.length > 1 && (
        <button className="view-comments-button" onClick={toggleComments}>
          {showAllComments
            ? "Hide comments"
            : `View ${comments.length - 1} previous comments`}
        </button>
      )}
      {displayedComments.length > 0 && (
        <div className="comment-list">
          {displayedComments.map((comment) => (
            <Comment
              key={comment.id || `temp-${comment.createdAt}`}
              comment={comment}
            />
          ))}
        </div>
      )}
      <div className={`comment-form ${showForm ? "show" : ""}`}>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            rows="3"
          />
          <button type="submit">Comment</button>
        </form>
      </div>
    </div>
  );
};

Post.propTypes = {
  createComment: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  createOrUpdateReaction: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  onPostDeleted: PropTypes.func,
  onCommentAdded: PropTypes.func,
  onReactionUpdated: PropTypes.func,
};

const mapDispatchToProps = {
  createComment,
  deletePost,
  createOrUpdateReaction,
};

const mapStateToProps = (state) => ({
  username: state.auth.user.sub,
  user: state.user.userInfo,
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
