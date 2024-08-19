import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import FriendsList from "./OnlineFriendList";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo, getTimeline } from "../../actions/userAction";
import Messenger from "../Message";
import { getListFriend } from "../../actions/friendAction";
import "../../styles/Home.css";
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const friendList = useSelector((state) => state.friend.friendList);

  useEffect(() => {
    if (user.sub) {
      dispatch(getTimeline(user.sub));
      dispatch(getUserInfo(user.sub));
      dispatch(getListFriend(user.sub));
    } else {
      navigate("/login");
    }
  }, [user.sub, dispatch, navigate]);

  return (
    <div>
      <Header />
      <div className="home-container">
        <main className="main-content">
          <Outlet />
        </main>
        <aside className="friends-sidebar">
          <FriendsList friends={friendList} />
        </aside>
      </div>
      <Messenger />
    </div>
  );
};

export default Home;
