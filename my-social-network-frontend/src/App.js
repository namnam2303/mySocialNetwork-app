import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Header from "./components/layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import initAuth from "./utils/initAuth";
import Login2 from "./components/login/Login2";
import Timeline from "./components/Timeline";

const App = () => {
  useEffect(() => {
    initAuth();
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login2" element={<Login2 />} />
        <Route path="/timeline" element={<Timeline />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
};

export default App;
