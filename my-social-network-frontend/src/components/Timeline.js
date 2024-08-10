import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Post from "./post/Post";
import { getTimeline } from "../actions/userAction";
import createComment from "../actions/commentAction";
import "../styles/FacebookTimeline.css";

const Timeline = ({ user, timelineData, getTimeline, createComment }) => {
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    if (user && user.sub) {
      getTimeline(user.sub);
    }
  }, [user, getTimeline]);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    // Implement post creation logic here
    setNewPost("");
  };

  return (
    <div className="facebook-timeline">
      <div className="post-creator">
        <img
          src={user.avatar || "/api/placeholder/40/40"}
          alt={user.username}
          className="user-avatar"
        />
        <form onSubmit={handlePostSubmit}>
          <input
            type="text"
            placeholder="Bạn đang nghĩ gì?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <button type="submit">Đăng</button>
        </form>
      </div>

      {timelineData && timelineData.length > 0 ? (
        timelineData.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <div className="no-posts">Không có bài đăng nào.</div>
      )}
    </div>
  );
};

Timeline.propTypes = {
  user: PropTypes.object.isRequired,
  timelineData: PropTypes.array.isRequired,
  getTimeline: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  timelineData: state.posts.posts || [],
});

const mapDispatchToProps = {
  getTimeline,
  createComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
