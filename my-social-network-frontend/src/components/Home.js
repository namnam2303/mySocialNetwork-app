import React from "react";
import { connect } from "react-redux";
import Post from "./post/Post";
import { getTimeline } from "../actions/userAction";
import { useEffect } from "react";
import PropTypes from "prop-types";

const Home = ({ user, timelineData, getTimeline }) => {
  useEffect(() => {
    if (user && user.sub) {
      getTimeline(user.sub);
    }
  }, [user, getTimeline]);

  return (
    <div className="container">
      <h1>Welcome to MySocialNetwork</h1>
      {user && <h2>Hello, {user.username}!</h2>}

      <div className="timeline">
        {timelineData && timelineData.length > 0 ? (
          timelineData.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.object.isRequired,
  timelineData: PropTypes.array.isRequired,
  getTimeline: PropTypes.func.isRequired, // Đảm bảo getTimeline là một hàm và là prop bắt buộc
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  timelineData: state.posts.posts || [], // Đảm bảo timelineData luôn là một mảng
});

export default connect(mapStateToProps, { getTimeline })(Home);
