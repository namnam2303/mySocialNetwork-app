import React, { useState, useEffect, useCallback } from "react";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Post from "../post/Post";
import { createPost } from "../../actions/postAction";
import { getPostOfUser, getTimeline } from "../../actions/userAction";
import createComment from "../../actions/commentAction";
import "../../styles/Profile/ProfileTimeline.css";
import { getAvatarSrc } from "../../utils/utils";

const ProfileTimeline = ({
  user,
  timelineData,
  getPostOfUser,
  createComment,
}) => {
  const [newPost, setNewPost] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const dispatch = useDispatch();

  const fetchUserPosts = useCallback(() => {
    if (user && user.username) {
      getPostOfUser(user.username);
    }
  }, [user, getPostOfUser]);

  useEffect(() => {
    fetchUserPosts();
  }, [fetchUserPosts]);

  const handleInputChange = (e) => {
    setNewPost(e.target.value);
    adjustTextareaHeight(e.target);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handlePostSubmit(e);
    }
  };

  const adjustTextareaHeight = (element) => {
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPost.trim() || image) {
      try {
        await dispatch(createPost(user.username, newPost, image));
        setNewPost("");
        setImage(null);
        setPreviewUrl(null);
        const textarea = e.target.querySelector("textarea");
        textarea.style.height = "auto";
        dispatch(getTimeline(user.username));
        // Refresh timeline after creating a new post
        getPostOfUser(user.username);
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  return (
    <div className="facebook-timeline">
      <div className="post-creator">
        <img
          src={getAvatarSrc(user.username, user.avatar)}
          alt={user.username}
          className="user-avatar"
        />
        <form onSubmit={handlePostSubmit}>
          <textarea
            placeholder="Bạn đang nghĩ gì?"
            value={newPost}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows="1"
          />
          <div className="post-actions">
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <label htmlFor="image-upload" className="image-upload-label">
              <i className="fas fa-image"></i>
            </label>
            <button type="submit">Đăng</button>
          </div>
          {previewUrl && (
            <div className="image-preview">
              <img src={previewUrl} alt="Preview" />
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  setPreviewUrl(null);
                }}
              >
                Xóa ảnh
              </button>
            </div>
          )}
        </form>
      </div>

      {timelineData && timelineData.length > 0 ? (
        timelineData.map((post) => {
          // Create a copy of the post and modify if necessary
          const modifiedPost = { ...post, comments: post.comments || [] };
          if (modifiedPost.user.username === user.username) {
            modifiedPost.user = { ...modifiedPost.user, fullName: "You" };
          }
          return (
            <Post
              key={modifiedPost.id}
              post={modifiedPost}
              onPostDeleted={(deletedPostId) => {
                getPostOfUser(user.username);
              }}
            />
          );
        })
      ) : (
        <div className="no-posts">Không có bài đăng nào.</div>
      )}
    </div>
  );
};

ProfileTimeline.propTypes = {
  user: PropTypes.object.isRequired,
  timelineData: PropTypes.array.isRequired,
  getPostOfUser: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  timelineData: state.user.userPosts || [],
});

const mapDispatchToProps = {
  getPostOfUser,
  createComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTimeline);
