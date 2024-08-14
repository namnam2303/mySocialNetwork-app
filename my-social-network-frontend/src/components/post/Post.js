import React, { useState, useEffect, useMemo, useCallback } from "react";
import "../../styles/Post.css";
import Comment from "../Comment";
import createComment from "../../actions/commentAction";
import { deletePost } from "../../actions/postAction";
import { createOrUpdateReaction } from "../../actions/reactionAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const REACTION_ICONS = {
  LIKE: "thumbs-up",
  LOVE: "heart",
  HAHA: "laugh",
  SAD: "sad-tear",
  ANGRY: "angry",
};

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
  const [localPost, setLocalPost] = useState(post);
  const navigate = useNavigate();

  useEffect(() => {
    setLocalPost(post);
  }, [post]);

  const userReaction = useMemo(() => {
    return (
      localPost.reactions?.find((r) => r.username === username)?.reactionType ||
      null
    );
  }, [localPost.reactions, username]);

  const reactionCounts = useMemo(() => {
    return localPost.reactions?.reduce((acc, reaction) => {
      acc[reaction.reactionType] = (acc[reaction.reactionType] || 0) + 1;
      return acc;
    }, {});
  }, [localPost.reactions]);

  const timeAgo = useCallback((dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInMs = now - postDate;

    const diffInSeconds = Math.floor(diffInMs / 1000 + 2);
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
  }, []);

  const handleCommentClick = () => setShowForm(!showForm);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentObject = {
      content: newComment,
      isDeleted: false,
      user: { username: username },
      createdAt: new Date().toISOString(),
    };

    try {
      const createdComment = await createComment(
        localPost.publicId,
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

      setLocalPost((prevPost) => ({
        ...prevPost,
        comments: [...(prevPost.comments || []), commentWithId],
      }));
      setNewComment("");
      setShowForm(false);
      if (onCommentAdded) {
        onCommentAdded(localPost.publicId, commentWithId);
      }
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  const toggleComments = () => setShowAllComments(!showAllComments);

  const handleDeletePost = async () => {
    try {
      await deletePost(localPost.publicId);
      if (onPostDeleted) {
        onPostDeleted(localPost.publicId);
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const toggleOptions = () => setShowOptions(!showOptions);

  const handleReaction = async (reactionType) => {
    try {
      const updatedPost = await createOrUpdateReaction(
        localPost.publicId,
        username,
        { reactionType }
      );
      updatedPost.user.fullName =
        updatedPost.user.username === username
          ? "You"
          : updatedPost.user.fullName;
      setLocalPost(updatedPost);
      if (onReactionUpdated) {
        onReactionUpdated(localPost.publicId, updatedPost);
      }
    } catch (error) {
      console.error("Failed to update reaction:", error);
    }
  };

  const displayedComments = useMemo(() => {
    if (
      !localPost.comments ||
      localPost.comments.length <= 1 ||
      showAllComments
    ) {
      return localPost.comments || [];
    }
    return [localPost.comments[localPost.comments.length - 1]];
  }, [localPost.comments, showAllComments]);

  const handleUserClick = useCallback(
    (username) => {
      navigate(`/profile/${username}`);
    },
    [navigate]
  );

  return (
    <div className="post-card">
      <div className="card-block post-timelines">
        <div className="post-header">
          <div
            className="image-container"
            onClick={() => handleUserClick(localPost.user?.username)}
            style={{ cursor: "pointer" }}
          >
            <img
              className="image-avatar"
              src={`/user/avatar/${localPost.user?.username}`}
              alt="User avatar"
            />
          </div>
          <div className="post-fullname">{localPost.user?.fullName}</div>
          <div className="social-time">{timeAgo(localPost.createdAt)}</div>
        </div>
        {username === localPost.user?.username && (
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
      {localPost.imageUrl && (
        <div className="post-image-wrapper">
          <img src={localPost.imageUrl.substring(7)} alt="Post" />
        </div>
      )}
      <div className="card-block">
        <div className="timeline-details">
          <p>{localPost.content}</p>
        </div>
      </div>
      <div className="social-msg">
        <div className="like-container">
          <div className="like-options">
            {Object.entries(REACTION_ICONS).map(([type, icon]) => (
              <i
                key={type}
                className={`fa fa-${icon}`}
                title={type.charAt(0) + type.slice(1).toLowerCase()}
                onClick={() => handleReaction(type)}
              ></i>
            ))}
          </div>
          <button className="like-main">
            <i
              className={`fa fa-${REACTION_ICONS[userReaction || "LIKE"]}`}
            ></i>
            {userReaction
              ? userReaction.charAt(0) + userReaction.slice(1).toLowerCase()
              : "Like"}{" "}
            (
            {Object.values(reactionCounts || {}).reduce((a, b) => a + b, 0) ||
              0}
            )
          </button>
        </div>
        <button className="comment-button" onClick={handleCommentClick}>
          <i className="fa fa-comment"></i>
          Comment ({localPost.comments?.length || 0})
        </button>
      </div>
      {localPost.comments && localPost.comments.length > 1 && (
        <button className="view-comments-button" onClick={toggleComments}>
          {showAllComments
            ? "Hide comments"
            : `View ${localPost.comments.length - 1} previous comments`}
        </button>
      )}
      {displayedComments.length > 0 && (
        <div className="comment-list">
          {displayedComments.map((comment) => (
            <Comment
              key={comment.publicId || `temp-${comment.createdAt}`}
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
