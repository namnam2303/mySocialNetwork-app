import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./layout/Header";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo, getTimeline } from "../actions/userAction";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user.sub) {
      dispatch(getTimeline(user.sub));
      dispatch(getUserInfo(user.sub));
    }
  }, [user.sub]);

  return (
    <div>
      <Header />
      <main className="container mt-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
