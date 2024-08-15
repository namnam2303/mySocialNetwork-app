import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./layout/Header";
import FriendsList from "./OnlineFriendList";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo, getTimeline } from "../actions/userAction";
import Messenger from "./Message";
import "../styles/Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // Fake friends data
  const friends = [
    {
      username: "john_doe",
      fullName: "John Doe",
      isOnline: true,
      avatar: "toan",
    },
    {
      username: "jane_smith",
      fullName: "Jane Smith",
      isOnline: false,
      avatar: "toan",
    },
    {
      username: "mike_johnson",
      fullName: "Mike Johnson",
      isOnline: true,
      avatar: "toan",
    },
    {
      username: "emily_brown",
      fullName: "Emily Brown",
      isOnline: true,
      avatar: "toan",
    },
    {
      username: "david_wilson",
      fullName: "David Wilson",
      isOnline: false,
      avatar: "toan",
    },
    {
      username: "sarah_lee",
      fullName: "Sarah Lee",
      isOnline: true,
      avatar: "toan",
    },
    {
      username: "chris_taylor",
      fullName: "Chris Taylor",
      isOnline: false,
      avatar: "toan",
    },
    {
      username: "lisa_anderson",
      fullName: "Lisa Anderson",
      isOnline: true,
      avatar: "toan",
    },
    {
      username: "robert_martinez",
      fullName: "Robert Martinez",
      isOnline: false,
      avatar: "toan",
    },
    {
      username: "jessica_white",
      fullName: "Jessica White",
      isOnline: true,
      avatar: "toan",
    },
  ];

  useEffect(() => {
    if (user.sub) {
      dispatch(getTimeline(user.sub));
      dispatch(getUserInfo(user.sub));
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
          <FriendsList friends={friends} />
        </aside>
      </div>
      <Messenger />
    </div>
  );
};

export default Home;
